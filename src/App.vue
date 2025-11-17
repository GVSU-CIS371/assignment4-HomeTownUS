<template>
  <div>
    <Beverage/>
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in beverageStore.bases" :key="base">
          <label>
            <input
              type="radio"
              name="base"
              :id="`r${base}`"
              :value="base"
              v-model="beverageStore.currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`r${creamer}`"
              :value="creamer"
              v-model="beverageStore.currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup}`"
              :value="syrup"
              v-model="beverageStore.currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>
    <div>
      <input type="text" v-model="beverageStore.currentName" placeholder="Beverage Name">
      <button @click="beverageStore.makeBeverage(beverageStore.currentName, beverageStore.currentTemp, beverageStore.currentBase, beverageStore.currentCreamer, beverageStore.currentSyrup)"
      :disabled="!beverageStore.currentBase || !beverageStore.currentCreamer || !beverageStore.currentSyrup || !beverageStore.currentTemp || !beverageStore.currentName"
      >Make Beverage</button>
    </div>
    <div id="beverage-container">
      <ul>
        <li>
          <template v-for="bev in beverageStore.beverages" :key="bev.id">
              <input 
                type="radio"
                name="bevs"
                :id="`r${bev.id}`"
                :value="bev"
                @change="beverageStore.showBeverage(bev)"
                v-model="beverageStore.currentBeverage"
              />
            <label :for="bev.id">
              {{ bev.name }}
            </label>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from './stores/beverageStore';
const beverageStore = useBeverageStore();
beverageStore.init()
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
