<template>
    <div>
      <!-- menu -->
      <v-row class="ma-0 pa-0 mt-4">
        <v-col class="d-flex align-center">
          <!-- Icon -->
          <v-btn
            to="/about"
            class="ml-6"
            icon
            color="#2CEABC"
            style="background-color: #ffffff"
            elevation="5"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-icon class="ml-4" color="#3A746A">mdi-lightbulb</v-icon>
          <span class="ml-4 text-h5" style="color: #3a746a; font-weight: bold"
            >Zero Waste Tips</span
          >
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogAdd = true"
            class="mr-12"
            color="#1ED8AB"
            style="color: #ffffff; border-radius: 10px"
            elevation="0"
          >
            <v-icon color="#FFFFFF">mdi-plus</v-icon>
            Add some Tip
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- loading not show card-->
      <v-row class="ma-0 pa-0 ml-10 mr-12" style="place-content: center">
        <v-progress-circular
          v-if="loadData === true"
          :size="70"
          :width="7"
          color="#7CD40C"
          indeterminate
        >
        </v-progress-circular>
      </v-row>
      <!-- Card -->
      <v-row class="ma-0 pa-0 ml-10 mr-12">
        <v-col
          cols="12"
          sm="6"
          md="3"
          lg="3"
          class="d-flex align-center"
          v-for="(item, i) in data"
          :key="i"
        >
          <v-card width="300px" height="200px" elevation="5">
            <!-- Icon dot and menu -->
            <div class="d-flex justify-end">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mt-2" icon v-on="on" v-bind="attrs">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
  
                <v-list class="justify-center" rounded style="" width="160px">
                  <v-list-item-group>
                    <v-list-item @click="editItem(item)" class="ma-2">
                      <v-list-item-title class="ml-2"> Edit </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteItem(item)" class="ma-2">
                      <v-list-item-title class="ml-2"> Delete </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
            <!-- content image -->
            <div class="mx-auto" style="margin-top: -5%">
              <v-img
                v-if="!item.image"
                :src="require(`../assets/zerowaste_8.png`)"
                contain
                height="100px"
              />
              <v-img
                v-if="item.image"
                :src="require(`../assets/${item.image}`)"
                contain
                height="100px"
              />
            </div>
            <!-- Text -->
            <div
              style="
                max-width: 285px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <span
                class="ml-6 text-truncate"
                style="color: #3a746a; font-weight: bold"
                >{{ item.name }}</span
              >
            </div>
            <!-- Text and see more button -->
            <v-row>
              <v-col cols="12" class="d-flex">
                <span class="ml-6" style="color: #70b1a6; font-size: 13px">
                  {{ "Here some tricks :)" }}
                </span>
                <v-spacer></v-spacer>
                <v-btn
                  @click="seeMore(item)"
                  depressed
                  x-small
                  class="mr-4"
                  color="#EDFEE0"
                  style="color: #7cd40c; font-weight: 400"
                  >see more</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- Dialog Add -->
      <v-Dialog v-model="dialogAdd" max-width="500px">
        <v-card min-height="440px">
          <div class="d-flex justify-end mr-4">
            <v-btn class="mt-2" icon @click="dialogAdd = false">
              <v-icon color="#7CD40C" size="38px">mdi-close</v-icon>
            </v-btn>
          </div>
          <div style="text-align: center; font-size: 30px; font-weight: bold">
            <span> Add Some Tip! </span>
          </div>
          <v-card-text style="text-align: center">
            Let's share your tips to make our community become to zero waste!
          </v-card-text>
          <v-form>
            <v-container>
              <v-row style="place-content: center">
                <v-col cols="12" style="max-width: 90%">
                  <v-text-field
                    v-model="formAdd.name"
                    label="Name Your Tip!"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" style="max-width: 90%">
                  <v-textarea
                    v-model="formAdd.detail"
                    label="Please describe your tip here ;)"
                    outlined
                    dense
                    hide-details="auto"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions class="mt-2 justify-center">
            <v-btn color="#7CD40C" @click="addTip()" style="color: #ffffff">
              ADD YOUR TIP!
            </v-btn>
            <v-btn
              outlined
              color="##8A8D93"
              @click="dialogAdd = false"
              style="opacity: 50%"
            >
              CANCEL
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-Dialog>
      <!-- Dialog Edit -->
      <v-Dialog v-model="dialogEdit" max-width="500px">
        <v-card min-height="440px">
          <div class="d-flex justify-end mr-4">
            <v-btn class="mt-2" icon @click="dialogEdit = false">
              <v-icon color="#7CD40C" size="38px">mdi-close</v-icon>
            </v-btn>
          </div>
          <div style="text-align: center; font-size: 30px; font-weight: bold">
            <span> Edit Some Tip! </span>
          </div>
          <v-card-text style="text-align: center">
            Let's share your tips to make our community become to zero waste!
          </v-card-text>
          <v-form>
            <v-container>
              <v-row style="place-content: center">
                <v-col cols="12" style="max-width: 90%">
                  <v-text-field
                    v-model="formEdit.name"
                    label="Composting"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" style="max-width: 90%">
                  <v-textarea
                    v-model="formEdit.detail"
                    label="Please describe your tip here ;)"
                    outlined
                    dense
                    hide-details="auto"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions class="mt-2 justify-center">
            <v-btn color="#7CD40C" @click="updateTip" style="color: #ffffff">
              SAVE YOUR TIP!
            </v-btn>
            <v-btn
              outlined
              color="##8A8D93"
              @click="dialogEdit = false"
              style="opacity: 50%"
            >
              CANCEL
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-Dialog>
      <!-- see more -->
      <v-Dialog v-model="dialogSeeMore" max-width="540px">
        <v-card min-height="340px">
          <div class="d-flex justify-end mr-4">
            <v-btn class="mt-2" icon @click="dialogSeeMore = false">
              <v-icon color="#7CD40C" size="38px">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="mx-auto">
            <v-progress-circular
              v-if="loadImage == true"
              :size="70"
              :width="7"
              color="#7CD40C"
              indeterminate
            />
            <v-img
              v-if="!dataSeeMore.image"
              :src="require(`../assets/zerowaste_8.png`)"
              contain
              height="100px"
            />
            <v-img
              v-if="loadImage == false && dataSeeMore.image"
              :src="require(`../assets/${dataSeeMore.image}`)"
              contain
              height="100px"
            />
          </div>
          <div class="mr-12 ml-12">
            <v-card-title style="font-size: 27px; color: #5e5873">
              {{ dataSeeMore.name }}
            </v-card-title>
            <v-card-subtitle style="font-size: 13px; color: #8f8f8f">
              Let's become to zero wastes!
            </v-card-subtitle>
            <v-card-text style="font-size: 16px; color: #5e5873">
              {{ dataSeeMore.detail }}
            </v-card-text>
          </div>
          <div></div>
        </v-card>
      </v-Dialog>
      <!--  -->
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        data: [],
        dialogAdd: false,
        dialogEdit: false,
        dialogDelete: false,
        dialogSeeMore: false,
        loadData: true,
        dataSeeMore: [],
        loadImage: true,
        formEdit: [],
        formAdd: {
          name: "",
          detail: "",
        },
      };
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          await axios.get("http://13.229.97.141:3000/tips").then((response) => {
            this.data = response.data.data;
            this.loadData = false;
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      seeMore(item) {
        this.dataSeeMore = item;
        this.dialogSeeMore = true;
        this.loadImage = false;
      },
      editItem(item) {
        this.formEdit = item;
        console.log(this.formEdit.id);
        this.dialogEdit = true;
      },
      async updateTip() {
        await axios
          .put(
            `http://13.229.97.141:3000/tips/${this.formEdit.id}`,
            this.formEdit
          )
          .then((response) => {
            console.log("Update successful!", response.data);
            alert("Update successful!");
            this.getData();
            this.dialogEdit = false;
            // this.$router.push('/about');
          })
          .catch((error) => {
            alert(error);
          });
      },
      async addTip() {
        await axios
          .post("http://13.229.97.141:3000/tips", this.formAdd)
          .then((response) => {
            console.log("Create successful!", response.data);
            alert("Create successful!");
            this.getData();
            this.dialogAdd = false;
          })
          .catch((error) => {
            alert(error);
          });
      },
      async deleteItem(item) {
        await axios
          .delete(`http://13.229.97.141:3000/tips/${item.id}`)
          .then((response) => {
            console.log("Delete successful!", response.data);
            alert("Delete successful!");
            this.getData();
          })
          .catch((error) => {
            alert(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .v-menu__content {
    border-radius: 15px;
    /* ขอบมน Menu */
  }
  
  .v-list-item:hover:not(.v-list-item--active) {
    background-color: #edfee0 !important;
    color: #7cd40c;
    /* สีที่เมาส์ชี้ */
  }
  
  .v-list-item.v-list-item--active {
    background-color: #edfee0 !important;
    /* สีที่เมาส์คลิก */
    color: #7cd40c !important;
  }
  </style>
  