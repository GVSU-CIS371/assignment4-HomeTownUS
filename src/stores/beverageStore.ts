import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";


export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      const bases: CollectionReference = collection(db, "bases")
      const creamers: CollectionReference = collection(db, "creamers")
      const syrups: CollectionReference = collection(db, "syrups")
      const beverages: CollectionReference = collection(db, "beverages")

      var base: BaseBeverageType[] = []
      try{
        getDocs(bases).then((qs:QuerySnapshot) => {
          qs.forEach((qd: QueryDocumentSnapshot) => {
            const tBase = qd.data() as BaseBeverageType
            base.push(tBase)
          });
          this.bases = base
          this.currentBase = base[0]
        });
      } catch(e) {console.log(e)}
      var creamer: CreamerType[] = []
      try{
        getDocs(creamers).then((qs2:QuerySnapshot) => {
          qs2.forEach((qd: QueryDocumentSnapshot) => {
            const tCreamer = qd.data() as CreamerType
            creamer.push(tCreamer)
          });
          this.creamers = creamer
          this.currentCreamer = creamer[1]
        })
      } catch(e) {console.log(e)}
      var syrup: SyrupType[] = []
      try{
        getDocs(syrups).then((qs3:QuerySnapshot) => {
          qs3.forEach((qd: QueryDocumentSnapshot) => {
            const tSyrup = qd.data() as SyrupType
            syrup.push(tSyrup)
          });
          this.syrups = syrup
          this.currentSyrup = syrup[1]
        })
      } catch(e) {console.log(e)}
      onSnapshot(beverages, (qs) => {
        qs.docChanges().forEach((chg) => {
          const bev = chg.doc.data() as BeverageType;
          switch (chg.type){
            case "added":
              this.beverages.push(bev)
              break;
            case "removed":
              break;
            case "modified":
              break;
          }
        });
      })
    },
    makeBeverage(name: string | null, temp: string | null, base: BaseBeverageType | null, creamer: CreamerType | null, syrup: SyrupType | null) {
      if(!name || !temp || !base || !creamer || !syrup){}
      else{
        const index = this.beverages.findIndex(bev => bev.id === (base.id + "-" + creamer.id + "-" + syrup.id + "-" + name));
        if(index === -1) {
          var currentBev: BeverageType = {
            id: base.id + "-" + creamer.id + "-" + syrup.id + "-" + name,
            name: name,
            temp: temp,
            base: base,
            syrup: syrup,
            creamer: creamer,
          }
          const bev = doc(db, "beverages", currentBev.id);
          setDoc(bev, { name: name,
            temp: temp,
            base: base,
            syrup: syrup,
            creamer: creamer,})
          .catch((err: any) => {console.log(err)});
        }
        else {currentBev = this.beverages[index]}
      }
    },

    showBeverage(b: BeverageType) {
      this.currentBase = b.base;
      this.currentCreamer = b.creamer;
      this.currentSyrup = b.syrup;
      this.currentTemp = b.temp;
      this.currentBeverage = b;
      this.currentName = b.name;
    },
  },
});
