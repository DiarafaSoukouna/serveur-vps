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
                class="w-full table-auto text-left text-sm font-light text-surface-color dark:text-white"
              >
                <thead
                  class="border-b border-neutral-200 font-medium dark:border-white/10"
                >
                  <tr style="background-color: #000; color: #fff">
                    <th scope="col" class="px-6 py-4">Nom domaine</th>
                    <th scope="col" class="px-6 py-4">Nom hote</th>
                    <th scope="col" class="px-6 py-4">Nom utilisateur</th>
                    <th scope="col" class="px-6 py-4">Lien</th>
                    <th scope="col" class="px-6 py-4">Domaine</th>
                    <th scope="col" class="px-6 py-4">Mot de passe</th>
                    <th scope="col" class="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-neutral-200 dark:border-white/10"
                    v-for="oneBa in filteredList"
                    :key="oneBa.id_domaine"
                    style="background-color: #e4e4e4; font-weight: 400"
                  >
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ oneBa.nom }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ oneBa.nom_hote }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ oneBa.nom_utilisateur }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ oneBa.lien }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ returnDo(oneBa.domaine_id) }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      {{ oneBa.mot_de_passe }}
                    </td>
                    <td>
                      <a
                        @click="
                          edit = true;
                          onRecup(oneBa.id);
                        "
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        ><i class="fas fa-pencil-alt"></i
                      ></a>
                      <span
                        @click="
                          this.delete = true;
                          this.id = oneBa.id;
                        "
                        style="margin: 10px; color: red"
                        ><i class="fas fa-trash-alt"></i
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                        deletebase(this.id);
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
            <div class="modal-overlay" v-if="edit">
              <div class="modal-content" style="text-align: center">
                <span class="close" @click="edit = false">&times;</span>
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
                    v-model="nomB"
                    type="text"
                    class="input-field"
                    placeholder="Nom de la base"
                  />
                  <input
                    v-model="nomUB"
                    type="text"
                    class="input-field"
                    placeholder="Nom utilisateur"
                  />
                </div>
                <div class="input-group">
                  <input
                    v-model="nomHB"
                    type="text"
                    class="input-field"
                    placeholder="Nom hote"
                  />
                  <input
                    v-model="passwordB"
                    type="text"
                    class="input-field"
                    placeholder="Mot de passe"
                  />
                </div>
                <div class="input-group">
                  <input
                    v-model="lien"
                    type="text"
                    class="input-field"
                    placeholder="Lien"
                  />
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
                    updateBase();
                    clean();

                    edit = false;
                  "
                >
                  Modifier
                </button>
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

export default {
  data() {
    return {
      allBase: "",
      searchQuery: "",
      allDomaines: "",
      edit: false,
      nomB: "",
      nomUB: "",
      nomHB: "",
      passwordB: "",
      lien: "",
      domaine_id: "",
      id: "",
      delete: false,
    };
  },
  methods: {
    async getBase() {
      try {
        const response = await axios.get("http://localhost:3000/getBase");
        this.allBase = response.data;
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getNote() {
      try {
        const response = await axios.get("http://localhost:3000/getDomaine");
        this.allDomaines = response.data;
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async updateBase() {
      try {
        const response = await axios.post("http://localhost:3000/updateBase", {
          nom: this.nomB,
          nom_hote: this.nomHB,
          nom_utilisateur: this.nomUB,
          mot_de_passe: this.mot_de_passe,
          lien: this.lien,
          domaine_id: this.domaine_id,
          id: this.id,
        });
        console.log(response);
        this.getBase();
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async deletebase(id) {
      try {
        const response = await axios.post("http://localhost:3000/deleteBase", {
          id: id,
        });
        console.log(response);
        this.getBase();
        this.id = "";
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },

    async onRecup(id) {
      for (let i of this.allBase) {
        if (i.id == id) {
          this.id = i.id;
          this.nomB = i.nom;
          this.nomUB = i.nom_utilisateur;
          this.nomHB = i.nom_hote;
          this.passwordB = i.mot_de_passe;
          this.lien = i.lien;
          this.domaine_id = i.domaine_id;
        }
      }
    },
    rediriger() {
      this.$router.push({ path: "/profile" });
    },
    clean() {
      (this.id = ""), (this.nomB = "");
      this.nomUB = "";
      this.nomHB = "";
      this.passwordB = "";
      this.lien = "";
      this.domaine_id = "";
    },
    returnDo(id) {
      for (let i of this.allDomaines) {
        if (i.id_domaine == id) {
          return i.nom;
        }
      }
    },
  },
  beforeMount() {
    this.getBase();
    this.getNote();
  },
  computed: {
    filteredList() {
      if (!this.searchQuery) {
        return this.allBase;
      } else {
        return this.allBase.filter((item) =>
          item.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
};
</script>
<style>
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
  position: relative;
  border-radius: 5px;
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
  background-color: #701d17;
  color: #fff;
}

.cancel-button {
  background-color: #000;
  color: #fff;
  margin-left: 10px;
}
</style>
