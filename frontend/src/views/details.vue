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
              class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
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
            <div>
              <div
                class="mx-auto"
                style="
                  padding: 20px;
                  background-color: black;
                  color: white;
                  border-radius: 10px;
                  width: 77%;
                  text-align: center;
                "
              >
                <h2 style="color: white; font-size: 22px; font-weight: 700">
                  {{ not.nom }}
                </h2>
              </div>
              <div class="container mx-auto px-4 py-5" style="width: 80%">
                <div
                  class="mb-4 overflow-hidden border-b border-gray-200 rounded-lg shadow"
                >
                  <div class="bg-white overflow-x-auto">
                    <table
                      class="min-w-full bg-white mx-auto"
                      style="width: 100%"
                    >
                      <tbody class="text-gray-700">
                        <tr>
                          <td class="px-4 py-3">Prix annuel :</td>
                          <td class="px-4 py-3">{{ not.prix_annuel }}</td>
                        </tr>
                        <tr class="bg-gray-100">
                          <td class="px-4 py-3">Client :</td>
                          <td class="px-4 py-3">{{ not.client }}</td>
                        </tr>
                        <tr>
                          <td class="px-4 py-3">Nom hote :</td>
                          <td class="px-4 py-3">{{ not.nom_hote }}</td>
                        </tr>
                        <tr class="bg-gray-100">
                          <td class="px-4 py-3">Nom utilisateur :</td>
                          <td class="px-4 py-3">
                            {{ not.nom_utilisateur }}
                          </td>
                        </tr>
                        <tr>
                          <td class="px-4 py-3">VPS :</td>
                          <td class="px-4 py-3">
                            {{ returnVps(not.vps_id) }}
                          </td>
                        </tr>
                        <tr class="bg-gray-100">
                          <td class="px-4 py-3">Bases de donnees :</td>
                          <td class="px-4 py-3">
                            {{ returnBases(not.id_domaine) }}
                          </td>
                        </tr>
                        <tr>
                          <td class="px-4 py-3">Domaine principal :</td>
                          <td class="px-4 py-3">
                            {{ returnSous(not.parent) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      allDomaines: "",
      id_domaine: "",
      not: "",
      allBase: "",
      allVps: "",
    };
  },
  methods: {
    async getNote() {
      try {
        const response = await axios.get("http://localhost:3000/getDomaine");
        this.allDomaines = response.data;
        this.oneDom(this.id_domaine);
        console.log(this.allDomaines);
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
    async getBase() {
      try {
        const response = await axios.get("http://localhost:3000/getBase");
        this.allBase = response.data;
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    oneDom(id) {
      for (let i of this.allDomaines) {
        if (i.id_domaine == id) {
          this.not = i;
        }
      }
    },
    rediriger() {
      this.$router.push({ path: "/domaine" });
    },
    returnVps(id) {
      for (let x of this.allVps) {
        if (x.id_vps == id) {
          return x.nom_vps;
        }
      }
    },
    returnBases(id) {
      let bases = [];
      for (let b of this.allBase) {
        if (b.domaine_id === id) {
          bases.push(b.nom);
        }
      }
      return bases.join(", ");
    },
    returnSous(id) {
      for (let s of this.allDomaines) {
        if (s.parent !== 0) {
          if (s.parent == id) {
            for (let p of this.allDomaines) {
              if (p.id_domaine === id) {
                return p.nom;
              }
            }
          }
        }
      }
    },
  },
  beforeMount() {
    this.getNote();
    this.getVps();
    this.getBase();
  },
  mounted() {
    this.id_domaine = this.$route.query.id_ex;
  },
};
</script>
<style>
.table {
  width: 80%;
  border-collapse: collapse;
}
</style>
