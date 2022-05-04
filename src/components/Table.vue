<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import type { Item, Sort } from "../types";
import { paginateArray } from "../utils";
import ItemTable from "./Item.vue";

const props = defineProps<{ toSearch: string }>();

const pages = ref<Item[][]>([]);
const page = ref<Item[]>([]);
const filter = ref<Sort>({});
const api = ref<Item[]>([]);
const mounted = ref(false);

const currenPage = ref(0);

watchEffect(() => {
  // prevent to execute effect before onMounted
  if (mounted.value) {
    if (props.toSearch !== "") {
      pages.value = paginateArray(
        [...api.value].filter(({ body, title }) => {
          return (
            title
              .trim()
              .toLowerCase()
              .includes(props.toSearch.trim().toLowerCase()) ||
            body
              .trim()
              .toLowerCase()
              .includes(props.toSearch.trim().toLowerCase())
          );
        }),
        8
      );

      page.value = pages.value[0];
      currenPage.value = 0;
    }
    // reset table state
    else {
      currenPage.value = 0;

      pages.value = paginateArray(api.value, 8);
      page.value = pages.value[0];
    }
  }
});

const filters = {
  userId(a: Item, b: Item, sort: Sort["orden"]) {
    return sort! === "asc" ? a.userId - b.userId : b.userId - a.userId;
  },
  id(a: Item, b: Item, sort: Sort["orden"]) {
    return sort! === "asc" ? a.id - b.id : b.id - a.id;
  },
  title(a: Item, b: Item, sort: Sort["orden"]) {
    return sort! === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  },
  body(a: Item, b: Item, sort: Sort["orden"]) {
    return sort! === "asc"
      ? a.body.localeCompare(b.body)
      : b.body.localeCompare(a.body);
  },
  index(a: Item, b: Item, sort: Sort["orden"]) {
    return this.id(a, b, sort);
  },
};

function sortTable(sortBy: Sort) {
  filter.value = sortBy;

  if (sortBy.orden !== undefined && sortBy.by !== undefined) {
    const orden = sortBy.orden;
    const by = sortBy.by;

    page.value.sort((a, b) => filters[by](a, b, orden));
  }
}

function nextPage() {
  if (currenPage.value < pages.value.length - 1) {
    currenPage.value++;

    page.value = pages.value[currenPage.value];
  }
}

function prevPage() {
  if (currenPage.value > 0) {
    currenPage.value--;

    page.value = pages.value[currenPage.value];
  }
}

onMounted(async () => {
  mounted.value = true;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  api.value = data;
  pages.value = paginateArray(data, 8);

  page.value = pages.value[currenPage.value];
});
</script>

<template>
  <div class="w-full flex flex-col items-center sm:items-end justify-center">
    <div class="w-full overflow-x-auto">
      <table class="min-w-max table-auto rounded h-max w-full">
        <thead>
          <tr class="bg-blue-900 text-white uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">
              <div class="flex">
                <span> ID </span>

                <span
                  v-if="filter?.by === 'id' && filter?.orden !== 'asc'"
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'id', orden: 'asc' })"
                >
                  expand_less
                </span>

                <span
                  v-else
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'id', orden: 'desc' })"
                >
                  expand_more
                </span>
              </div>
            </th>

            <th class="py-3 px-6 text-left">
              <div class="flex">
                <span> Title </span>

                <span
                  v-if="filter?.by === 'title' && filter?.orden !== 'asc'"
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'title', orden: 'asc' })"
                >
                  expand_less
                </span>
                <span
                  v-else
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'title', orden: 'desc' })"
                >
                  expand_more
                </span>
              </div>
            </th>

            <th class="py-3 px-6 text-left">
              <div class="flex">
                <span> Body </span>

                <span
                  v-if="filter?.by === 'body' && filter?.orden !== 'asc'"
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'body', orden: 'asc' })"
                >
                  expand_less
                </span>
                <span
                  v-else
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'body', orden: 'desc' })"
                >
                  expand_more
                </span>
              </div>
            </th>

            <th class="py-3 px-6 text-left">
              <div class="flex">
                <span> User id </span>

                <span
                  v-if="filter?.by === 'userId' && filter?.orden !== 'asc'"
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'userId', orden: 'asc' })"
                >
                  expand_less
                </span>

                <span
                  v-else
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'userId', orden: 'desc' })"
                >
                  expand_more
                </span>
              </div>
            </th>

            <th class="py-3 px-6 text-left">
              <div class="flex">
                <span> Index </span>

                <span
                  v-if="filter?.by === 'index' && filter?.orden !== 'asc'"
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'index', orden: 'asc' })"
                >
                  expand_less
                </span>

                <span
                  v-else
                  class="material-icons mx-3 cursor-pointer"
                  @click="sortTable({ by: 'index', orden: 'desc' })"
                >
                  expand_more
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light h-3/5 overflow-y-auto">
          <ItemTable
            v-for="(item, index) in page"
            :key="item?.id"
            :index="index"
            :item="item"
          />
        </tbody>
      </table>
    </div>

    <div class="flex flex-row items-center mt-3">
      <div class="flex items-center">
        <span class="mx-4"> 1-{{ page?.length }} de {{ api?.length }} </span>

        <span> pagina {{ currenPage + 1 }} de {{ pages?.length }} </span>
      </div>

      <div class="flex flex-row items-center mx-4">
        <button
          @click="prevPage"
          :class="[
            'w-7 h-7 border mr-3 rounded shadow-sm',
            currenPage < 1 ? 'text-gray-200 cursor-not-allowed' : '',
          ]"
        >
          <span class="material-icons"> navigate_before </span>
        </button>

        <button
          @click="nextPage"
          :class="[
            'w-7 h-7 border mr-3 rounded shadow-sm',
            currenPage === pages.length - 1
              ? 'text-gray-200 cursor-not-allowed'
              : '',
          ]"
        >
          <span class="material-icons"> navigate_next </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
