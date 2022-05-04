<script setup lang="ts">
import { truncate } from "../utils";
import { Item } from "../types";

const props = defineProps<{
  item: Item;
  index: number;
}>();
</script>

<template>
  <tr
    :class="[
      'border-b border-gray-200 font-medium',
      index % 2 !== 0 ? 'bg-gray-100' : '',
    ]"
  >
    <td class="py-3 px-6 text-left whitespace-nowrap">
      <div class="flex items-center">
        <span class="font-medium">
          {{ props.item?.id }}
        </span>
      </div>
    </td>

    <td class="py-3 px-6 text-left whitespace-nowrap">
      <div class="flex items-center">
        {{ truncate(props.item?.title, 20) }}
      </div>
    </td>

    <td class="py-3 px-6 text-left whitespace-nowrap">
      <div class="flex items-center justify-start">
        {{ truncate(props.item?.body, 50) }}
      </div>
    </td>

    <td class="py-3 px-6 text-left whitespace-nowrap">
      <div class="flex item-center justify-center">
        {{ props.item?.userId }}
      </div>
    </td>

    <td class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        {{ props.item?.id - 1 }}
      </div>
    </td>
  </tr>
</template>
