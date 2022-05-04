<script setup lang="ts">
import Table from "./Table.vue";
import { ref } from "vue";

const toSearch = ref("");
</script>

<template>
  <div class="w-full mt-8 px-8">
    <div class="flex border-b">
      <span class="text-gray-700 text-2xl font-semibold mb-4">
        Consulta Los Post
      </span>
    </div>

    <div
      class="my-4 flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-between"
    >
      <div class="flex flex-row items-center">
        <label for="search" class="text-gray-700 font-semibold">Buscar: </label>

        <div class="mx-2 relative mt-1">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span class="material-icons text-blue-800 opacity-90 text-lg">
              search
            </span>
          </div>

          <input
            class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-64 pl-10 p-2.5"
            placeholder="Escribe lo que deseas buscar"
            v-model="toSearch"
            type="text"
            id="search"
          />
        </div>
      </div>

      <div class="mt-5 sm:mt-0 ml-16 sm:ml-0">
        <button class="bg-blue-900 text-white p-2 rounded-lg flex items-center">
          <span class="material-icons mr-2"> add </span>

          <span class="mr-2"> Nuevo Post </span>
        </button>
      </div>
    </div>

    <div class="flex">
      <Table :to-search="toSearch" />
    </div>
  </div>
</template>
