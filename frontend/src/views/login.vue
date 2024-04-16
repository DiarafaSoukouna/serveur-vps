<template>
  <section>
    <div
      style="
        background-image: url('https://www.k-upload.fr/wp-content/uploads/2022/10/serveur-informatique.jpg');
        background-size: cover;
        height: 100vh;
      "
    >
      <div>
        <div v-if="impossible">
          <div
            style="height: 60px"
            class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  class="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-bold">Connexion impossible</p>
                <p class="text-sm">Mot de passe ou email incorrect</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style="width: 500px"
        >
          <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            style="background-color: #d9d9d9; margin-top: 20%"
          >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                class="text-xl font-bold eading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                style="text-align: center"
              >
                Connexion
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="connexion">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Email</label
                  >
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="exemple@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Mot de passe</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div class="card">
                  <button type="submit" class="btn">Se connecter</button>
                </div>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous n'avez pas de compte?
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >Contactez l'administrateur</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="inscription">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        style="width: 500px; margin-top: 10px"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style="background-color: #d5d5d5"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold eading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
              style="text-align: center"
            >
              Inscription
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  style="margin-top: 15px"
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom</label
                >
                <input
                  v-model="nom"
                  style="margin-top: 10px"
                  type="text"
                  name="nom"
                  id="nom"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Votre nom"
                  required=""
                />
                <label
                  style="margin-top: 10px"
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prenom</label
                >
                <input
                  v-model="prenom"
                  style="margin-top: 10px"
                  type="text"
                  name="prenom"
                  id="prenom"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Votre prenom"
                  required=""
                />
                <label
                  style="margin-top: 10px"
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email</label
                >
                <input
                  v-model="email"
                  style="margin-top: 10px"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="exemple@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  style="margin-top: 10px"
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mot de passe</label
                >
                <input
                  v-model="password"
                  style="margin-top: 10px"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div class="card">
                <button class="btn" @click="inscript">S'inscrire</button>
              </div>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez deja un compte?
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  @click="inscription = false"
                  >Connectez vous</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inscription: false,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      impossible: false,
    };
  },
  methods: {
    async inscript() {
      try {
        const response = await axios.post("http://localhost:3000/inscription", {
          nom: this.nom,
          email: this.email,
          password: this.password,
        });
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async connexion() {
      try {
        const response = await axios.post(
          "https://cors-proxy.fringe.zone/https://devcosit.com/suivi/connexion",
          {
            email: this.email,
            password: this.password,
          }
        );
        localStorage.setItem("token", response.data.token);
        this.$router.push({ path: "/profile" });
      } catch (error) {
        this.impossible = true;
        setTimeout(() => {
          this.impossible = false;
        }, 5000);

        console.error("Erreur lors de l'appel de l'API :", error);
      }
    },
  },
};
</script>

<style scoped>
.btn {
  padding: 10px 10px; /* ajustez le rembourrage du bouton selon vos besoins */
  background-color: #000000; /* couleur de fond du bouton */
  color: #ffffff; /* couleur du texte du bouton */
  border: none; /* suppression de la bordure */
  border-radius: 4px; /* arrondi des coins du bouton */
  cursor: pointer; /* curseur de la souris */
  margin-left: 30%;
  width: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
