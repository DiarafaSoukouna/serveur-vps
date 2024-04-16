<template>
  <main class="profile-page">
    <section class="relative block" style="height: 350px">
      <div
        class="absolute top-0 w-full h-full bg-center bg-cover"
        style="
          background-image: url('https://www.k-upload.fr/wp-content/uploads/2022/10/serveur-informatique.jpg');
        "
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
        style="height: 70px"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
    <section>
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="py-6 px-3 mt-32 sm:mt-0 dropdown">
            <div
              class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-left lg:self-center"
            >
              <div class="py-6 px-3 mt-32 sm:mt-0">
                <button
                  class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 text-left"
                  type="button"
                  style="transition: all 0.15s ease 0s; background-color: #000"
                  @click="rediriger()"
                >
                  Retour
                </button>
              </div>
            </div>
            <div class="flex justify-center">
              <input
                v-model="searchQuery"
                style="
                  margin-bottom: 20px;
                  width: 40%;
                  background-color: #e4e4e4;
                "
                type="text"
                placeholder="Rechercher..."
                class="bg-gray-200 focus:outline-none focus:bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mr-2"
              />
            </div>
            <div class="overflow-hidden mx-auto" style="width: 80%">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr style="background-color: #000; color: #fff">
                    <th scope="col" class="px-6 py-3">Nom de domaine</th>
                    <th scope="col" class="px-6 py-3">Prix annuel</th>
                    <th scope="col" class="px-6 py-3">Date d'expiration</th>
                    <th scope="col" class="px-6 py-3">Client</th>
                    <th scope="col" class="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    v-for="domaine in filteredList"
                    :key="domaine.id"
                    style="background-color: #e7e7e7"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      @click="rediriger(domaine.id_domaine)"
                    >
                      {{ domaine.nom }}
                    </th>
                    <td
                      class="px-6 py-4"
                      @click="rediriger(domaine.id_domaine)"
                    >
                      {{ domaine.prix_annuel }}
                    </td>
                    <td
                      class="px-6 py-4"
                      @click="rediriger(domaine.id_domaine)"
                      style="color: red"
                    >
                      {{ formatDate(domaine.date_expiration) }}
                    </td>
                    <td
                      class="px-6 py-4"
                      @click="rediriger(domaine.id_domaine)"
                    >
                      {{ domaine.client }}
                    </td>
                    <td class="px-6 py-4">
                      <button
                        @click="
                          payer = true;
                          onRecup(domaine.id_domaine);
                        "
                        style="
                          padding: 8px;
                          background-color: rgb(144 144 144);
                          border-radius: 10px;
                          color: white;
                        "
                      >
                        Renouveller
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="this.payer">
              <div class="box">
                <div class="confirmation-content">
                  <h2>Veuillez inscrire la nouvelle date d'expiration</h2>
                  <input
                    v-model="date_ex"
                    type="date"
                    class="bg-gray-200 focus:outline-none focus:bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mr-2"
                  />
                  <div class="buttons">
                    <button class="confirm-button" @click="UpdateDate()">
                      Confirmer
                    </button>
                    <button class="cancel-button" @click="payer = false">
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      dates: "",
      searchQuery: "",
      currentDate: new Date(),
      payer: false,
      date_ex: "",
      id: "",
    };
  },
  methods: {
    async getNote() {
      try {
        const response = await axios.get("http://localhost:3000/getDomaine");
        this.dates = response.data.filter(
          (d) => new Date(d.date_expiration) < new Date(this.currentDate)
        );
        console.log(this.dates);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async UpdateDate() {
      try {
        const response = await axios.post(
          "http://localhost:3000/updateDomaineDate",
          {
            id_domaine: this.id,
            date_expiration: this.date_ex,
          }
        );

        console.log(this.id, this.date_ex, response);

        this.date_ex = "";
        this.payer = false;
        this.getNote();
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    formatDate(value) {
      if (value) {
        return moment(value).utc().format("YYYY-MM-DD");
      }
      return "";
    },
    rediriger() {
      this.$router.push({ path: "/profile" });
    },
    onRecup(id) {
      for (let i of this.dates) {
        if (i.id_domaine == id) {
          this.date_ex = this.formatDate(i.date_creation);
          this.id = i.id_domaine;
        }
      }
    },
  },
  mounted() {
    this.getNote();
  },
  computed: {
    filteredList() {
      if (!this.searchQuery) {
        return this.dates;
      } else {
        return this.dates.filter((item) =>
          item.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
};
</script>
<style>
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.confirmation-content {
  text-align: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
}

.confirmation-content h2 {
  margin-bottom: 10px;
}

.buttons {
  margin-top: 20px;
}

.confirm-button,
.cancel-button {
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-button {
  background-color: #000;
  color: #fff;
}

.cancel-button {
  background-color: #989898;
  color: #fff;
  margin-left: 10px;
}
</style>
