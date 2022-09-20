<script setup>
import { computed, defineProps } from "vue";
import { scaleLinear, max, scaleBand, range } from "d3";

const props = defineProps({
  entries: Array,
  columns: Array,
  format: String,
});

const margin = {
  top: 30,
  right: 45,
  bottom: 10,
  left: 45,
};
const barHeight = 25;
const width = 945;
const height =
  Math.ceil((props.entries.length + 0.1) * barHeight) +
  margin.top +
  margin.bottom;

const x = computed(() =>
  scaleLinear()
    .domain([0, max(props.entries, (d) => d.value)])
    .range([margin.left, width - margin.right])
);

const y = computed(() =>
  scaleBand()
    .domain(range(props.entries.length))
    .rangeBound([margin.top, height - margin.bottom])
    .padding(0.1)
);
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
      <g
        v-for="(entry, index) in entries"
        :key="'bar-' + index"
        fill="seagreen"
      >
        <rect
          x="x(0)"
          y="y(index)"
          width="Number(x(entry.value)) - Number(x(0))"
          height="y.bandwidth()"
        />
      </g>
      <g v-for="(entry, index) in entries" :key="'text-' + index" fill="white">
        <text
          :x="x(entry.value)"
          :y="Number(y(index)) + Number(y.bandwidth()) / 2"
          dx="-45"
          dy="0.35em"
        >
          {{ entry.value }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style></style>
