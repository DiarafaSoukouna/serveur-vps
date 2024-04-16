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

            <div class="w-full lg:w-1/3">
              <a
                href="#"
                class="block p-6 bg-white mx-auto border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                style="background-color: #000; max-width: 35rem"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  style="color: #fff"
                >
                  Accès du VPS
                </h5>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400"
                  style="color: #fff"
                >
                  Nom du Vps : &nbsp; &nbsp;{{ oneVps.nom_vps }}
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400"
                  style="color: #fff"
                >
                  Nom hote :&nbsp;&nbsp; {{ oneVps.nom_hote }}
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400"
                  style="color: #fff"
                >
                  Nom utilisateur :&nbsp;&nbsp; {{ oneVps.nom_utilisateur }}
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400"
                  style="color: #fff"
                >
                  Mot de passe :&nbsp;&nbsp; {{ oneVps.mot_de_passe }}
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400"
                  style="color: #fff"
                >
                  Adresse Ip :&nbsp;&nbsp; {{ oneVps.adresse_ip }}
                </p>
              </a>
            </div>
            <div class="flex justify-center">
              <input
                v-model="searchQuery"
                style="
                  margin-bottom: 20px;
                  margin-top: 20px;

                  width: 60%;
                  background-color: #e4e4e4;
                "
                type="text"
                placeholder="Rechercher..."
                class="bg-gray-200 focus:outline-none focus:bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mr-2"
              />
            </div>
            <div class="overflow-hidden mx-auto" style="width: 80%">
              <table
                class="min-w-full text-left text-sm font-light text-surface-color dark:text-white"
              >
                <thead
                  class="border-b border-neutral-200 font-medium dark:border-white/10"
                >
                  <tr style="background-color: #000; color: #fff">
                    <th scope="col" class="px-6 py-4">Nom domaine</th>
                    <th scope="col" class="px-6 py-4">Nom hote</th>
                    <th scope="col" class="px-6 py-4">Nom utilisateur</th>
                    <th scope="col" class="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-neutral-200 dark:border-white/10"
                    v-for="oneDo in filteredList"
                    :key="oneDo.id_domaine"
                    style="background-color: #e4e4e4; font-weight: 400"
                  >
                    <td
                      class="whitespace-nowrap px-6 py-4 cursor-pointer"
                      @click="redirigerDo(oneDo.id_domaine)"
                    >
                      {{ oneDo.nom }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 cursor-pointer"
                      @click="redirigerDo(oneDo.id_domaine)"
                    >
                      {{ oneDo.nom_hote }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 cursor-pointer"
                      @click="redirigerDo(oneDo.id_domaine)"
                    >
                      {{ oneDo.nom_utilisateur }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 cursor-pointer">
                      <button
                        @click="
                          payer = true;
                          re(oneDo);
                          returnBase(oneDo.id_domaine);
                        "
                        style="
                          padding: 8px;
                          background-color: rgb(144 144 144);
                          border-radius: 10px;
                          color: white;
                        "
                      >
                        Obtenir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="this.payer">
              <div class="box">
                <div class="confirmation-content">
                  <h2>
                    Êtes-vous sûr de vouloir obtenir les informations de ce
                    domaine ?
                  </h2>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="email@gmail.com"
                    class="bg-gray-200 focus:outline-none focus:bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mr-2"
                  />
                  <div class="buttons">
                    <button class="confirm-button" @click="getMail()">
                      Confirmer
                    </button>
                    <button
                      class="cancel-button"
                      @click="
                        payer = false;
                        email = '';
                      "
                    >
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

export default {
  data() {
    return {
      allVps: "",
      allDomaines: [],
      id_vps: "",
      oneVps: "",
      oneDo: "",
      searchQuery: "",
      payer: false,
      email: "",
      user: "",
      mail: "",
      base: "",
      allBase: "",
      oneBase: "",
      one: "",
    };
  },
  methods: {
    rediriger() {
      this.$router.push({ path: "/profile" });
    },

    redirigerDo(id) {
      this.$router.push({ path: "/details", query: { id_ex: id } });
    },
    async getVps() {
      try {
        const response = await axios.get("https://devcosit.com/suivi/getVps");
        this.allVps = response.data;
        this.allDomaines = response.data.map((x) => x.domaines);
        console.log(this.allDomaines);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getVpsById(id) {
      try {
        const response = await axios.post("http://localhost:3000/getVpsById", {
          id: id,
        });
        this.oneVps = response.data;
        this.oneDo = response.data.domaines;
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getBase() {
      try {
        const response = await axios.get("http://localhost:3000/getBase");
        this.allBase = response.data;
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getMail() {
      try {
        await axios.post("http://localhost:3000/send-mail-domaine", {
          user: this.user,
          mail: this.email,
          base: this.oneBase,
        });
        this.insertHist(this.user.nom);
        this.payer = false;
        this.email = "";
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async insertHist(nom) {
      const date = new Date();
      try {
        const response = await axios.post("http://localhost:3000/insertHist", {
          motif: "Recuperation acces",
          email: this.email,
          domaine: nom,
          date: date,
        });
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    re(user) {
      this.user = user;
    },
    returnBase(id) {
      for (let i of this.allBase) {
        if (i.domaine_id == id) {
          this.oneBase = i;
        }
      }
    },
  },

  beforeMount() {
    this.getVps();
    this.getBase();
  },
  mounted() {
    this.id_vps = this.$route.query.id_vp;
    this.getVpsById(this.id_vps);
    console.log(this.id_vps);
  },
  computed: {
    filteredList() {
      if (!this.searchQuery) {
        return this.oneDo;
      } else {
        return this.oneDo.filter((item) =>
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
