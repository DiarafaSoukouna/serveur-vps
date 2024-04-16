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
                  @click="redirigerProfil()"
                >
                  Retour
                </button>
              </div>
            </div>
            <input
              class="mx-auto"
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher..."
              style="
                width: 30%;
                border-radius: 10px;
                border: 1px solid #888;
                height: 40px;
              "
            />
            <div>
              <div class="mt-8" />

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        :class="{
                          classe: isDatePassed(domaine.date_expiration),
                        }"
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
                        <a
                          @click="
                            edit = true;
                            onRecup(domaine.id_domaine);
                          "
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          ><i class="fas fa-pencil-alt"></i
                        ></a>
                        <span
                          @click="deleteItem(domaine.id_domaine)"
                          style="margin: 10px; color: red"
                          ><i class="fas fa-trash-alt"></i
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-overlay" v-if="edit">
              <div class="modal-content" style="text-align: center">
                <span
                  class="close"
                  @click="
                    clean();
                    edit = false;
                  "
                  >&times;</span
                >
                <h2
                  style="
                    font-size: 22px;
                    color: #000;
                    font-weight: 700;
                    text-align: center;
                  "
                >
                  Nouvelle modification
                </h2>
                <div class="input-group">
                  <input
                    v-model="nom_domaine"
                    type="text"
                    class="input-field"
                    placeholder="Nom domaine"
                  />
                  <input
                    v-model="prix"
                    type="text"
                    class="input-field"
                    placeholder="Prix annuel"
                  />
                </div>
                <div class="input-group">
                  <input
                    v-model="client"
                    type="text"
                    class="input-field"
                    placeholder="Client"
                  />
                  <input
                    v-model="date_creation"
                    type="date"
                    class="input-field"
                    placeholder="Date de creation"
                  />
                </div>
                <div class="input-group">
                  <input
                    v-model="date_expiration"
                    type="date"
                    class="input-field"
                    placeholder="Date d'expiration"
                  />
                  <input
                    v-model="nom_hoteD"
                    type="text"
                    class="input-field"
                    placeholder="Nom hote"
                  />
                </div>
                <div class="input-group">
                  <input
                    v-model="nom_userD"
                    type="text"
                    class="input-field"
                    placeholder="Nom utilisateur"
                  />
                  <input
                    v-model="passwordD"
                    type="text"
                    class="input-field"
                    placeholder="mot de passe"
                  />
                </div>
                <div class="input-group">
                  <select v-model="vps1">
                    <option value="" disabled selected>
                      Sélectionnez un VPS
                    </option>
                    <option
                      v-for="option in allVps"
                      :key="option.id_vps"
                      :value="option.id_vps"
                    >
                      {{ option.nom_vps }}
                    </option>
                  </select>
                  <select v-model="domaine_id">
                    <option value="" disabled selected>
                      Sélectionnez un domaine
                    </option>
                    <option
                      v-for="option in allDomaines"
                      :key="option.id_domaine"
                      :value="option.id_domaine"
                    >
                      {{ option.nom }}
                    </option>
                  </select>
                </div>
                <button
                  class="closeBtn"
                  @click="
                    updateDomaine();
                    edit = false;
                    clean();
                    show = false;
                  "
                >
                  Modifier
                </button>
              </div>
            </div>
            <div v-if="this.delete === true">
              <div class="box">
                <div class="confirmation-content">
                  <h2>Êtes-vous sûr(e) de vouloir supprimer cet élément ?</h2>
                  <p>Cette action ne peut pas être annulée.</p>
                  <div class="buttons">
                    <button
                      class="confirm-button"
                      @click="
                        deleteDomaine(this.id);
                        this.delete = false;
                      "
                    >
                      Confirmer
                    </button>
                    <button class="cancel-button" @click="this.delete = false">
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
      searchQuery: "",
      allDomaines: [],
      edit: false,
      allVps: "",
      delete: false,
      id: "",
    };
  },
  methods: {
    async getNote() {
      try {
        const response = await axios.get("http://localhost:3000/getDomaine");
        this.allDomaines = response.data;

        console.log("dates", this.dates);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    isDatePassed(date) {
      return new Date(date) < new Date();
    },
    formatDate(value) {
      if (value) {
        return moment(value).utc().format("YYYY-MM-DD");
      }
      return "";
    },
    deleteItem(id) {
      this.delete = true;
      this.id = id;
    },
    redirigerProfil() {
      this.$router.push({ path: "/profile" });
    },
    rediriger(id) {
      this.$router.push({ path: "/details", query: { id_ex: id } });
    },
    async updateDomaine() {
      try {
        const response = await axios.post(
          "http://localhost:3000/updateDomaine",
          {
            id_domaine: this.id,
            nom: this.nom_domaine,
            prix_annuel: this.prix,
            client: this.client,
            date_creation: this.date_creation,
            date_expiration: this.date_expiration,
            nom_hote: this.nom_hoteD,
            nom_utilisateur: this.nom_userD,
            mot_de_passe: this.passwordD,
            vps_id: this.vps1,
            parent: this.domaine_id,
          }
        );
        console.log(response);
        this.getNote();
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async deleteDomaine(id) {
      try {
        const response = await axios.post(
          "http://localhost:3000/deleteDomaine",
          {
            id_domaine: id,
          }
        );
        console.log(response);
        this.getNote();
        this.id = "";
        this.delete = false;
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getVps() {
      try {
        const response = await axios.get("http://localhost:3000/getVps");
        this.allVps = response.data;
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async clean() {
      (this.nom_domaine = ""),
        (this.prix = ""),
        (this.client = ""),
        (this.date_creation = ""),
        (this.date_expiration = ""),
        (this.nom_hoteD = ""),
        (this.nom_userD = ""),
        (this.passwordD = ""),
        (this.vps1 = ""),
        (this.domaine_id = "");
    },
    async onRecup(id) {
      for (let i of this.allDomaines) {
        if (i.id_domaine == id) {
          this.id = i.id_domaine;
          this.nom_domaine = i.nom;
          this.prix = i.prix_annuel;
          this.client = i.client;
          this.date_creation = this.formatDate(i.date_creation);
          this.date_expiration = this.formatDate(i.date_expiration);
          this.nom_hoteD = i.nom_hote;
          this.nom_userD = i.nom_utilisateur;
          this.passwordD = i.mot_de_passe;
          this.vps1 = i.vps_id;
          this.domaine_id = i.parent;
        }
      }
    },
  },
  mounted() {
    this.getNote();
    this.getVps();
  },
  computed: {
    filteredList() {
      if (!this.searchQuery) {
        return this.allDomaines;
      } else {
        return this.allDomaines.filter((item) =>
          item.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
};
</script>
<style>
.classe {
  color: red;
}
.modal-overlay {
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
.container {
  height: auto;
}
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
  position: relative;
  border-radius: 20px;
}
.content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
  max-width: 800px;
  position: relative;
  border-radius: 10px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.close:hover {
  color: red;
}
.dte {
  font-size: 20px;
  font-weight: 700;
  font-family: match;
  color: #3a3a3a;
}
.closeBtn {
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
}

.closeBtn:hover {
  background-color: #1b1b1b;
}
.custom-textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
}
</style>
