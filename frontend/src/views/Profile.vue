<template>
  <div id="yo">
    <navbar-component></navbar-component>
    <div>
      <main class="profile-page">
        <section class="relative block" style="height: 400px">
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
              <div class="px-6">
                <div class="flex flex-wrap justify-center">
                  <div
                    class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                  ></div>

                  <div
                    class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
                  >
                    <div
                      class="py-6 px-3 mt-32 sm:mt-0 dropdown"
                      v-if="!oneDomaine"
                    >
                      <button
                        class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style="
                          transition: all 0.15s ease 0s;
                          padding: 10px;
                          width: 100px;
                          background-color: #000;
                        "
                      >
                        Ajouter
                      </button>
                      <div class="dropdown-content" style="text-align: left">
                        <a
                          @click="
                            vps = true;
                            show = true;
                          "
                          >Vps</a
                        >
                        <a
                          @click="
                            domaine = true;
                            show = true;
                          "
                          >Domaine</a
                        >
                        <a
                          @click="
                            sous = true;
                            show = true;
                          "
                          >Sous domaine</a
                        >
                        <a
                          @click="
                            base = true;
                            show = true;
                          "
                          >Base de donnees</a
                        >
                      </div>
                    </div>

                    <div class="py-6 px-3 mt-32 sm:mt-0" v-if="oneDomaine">
                      <button
                        class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 text-left"
                        type="button"
                        style="
                          transition: all 0.15s ease 0s;
                          background-color: #000;
                        "
                        @click="oneDomaine = false"
                      >
                        Return
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <h3 class="text-3xl font-medium text-gray-700">
                    Tableau de bord
                  </h3>

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
                </div>
                <div class="mt-4 w-full flex flex-wrap gap-4 p-20">
                  <div
                    class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full md:w-1/2 xl:w-1/3"
                    style="margin: 10px; width: 260px; background-color: black"
                  >
                    <div class="flex items-center" @click="redirigerDo">
                      <div class="flex-shrink-0">
                        <span
                          class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
                          style="color: #fff"
                          >{{ allDomaines.length }}</span
                        >
                        <h3
                          class="text-base font-normal text-gray-500"
                          style="color: rgb(173 173 176)"
                        >
                          Domaines
                        </h3>
                      </div>

                      <div
                        class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    @click="VpsT = true"
                    class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full md:w-1/2 xl:w-1/3"
                    style="margin: 10px; width: 260px; background-color: black"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <span
                          class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
                          style="color: #fff"
                          >{{ allVps.length }}</span
                        >
                        <h3
                          class="text-base font-normal text-gray-500"
                          style="color: rgb(173 173 176)"
                        >
                          VPS
                        </h3>
                      </div>
                      <div
                        class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    @click="VpsT = true"
                    class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full md:w-1/2 xl:w-1/3"
                    style="margin: 10px; width: 260px; background-color: black"
                  >
                    <div class="flex items-center" @click="redirigerBase()">
                      <div class="flex-shrink-0">
                        <span
                          class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
                          style="color: #fff"
                          >{{ allBase.length }}</span
                        >
                        <h3
                          class="text-base font-normal text-gray-500"
                          style="color: rgb(173 173 176)"
                        >
                          Bases de donnés
                        </h3>
                      </div>
                      <div
                        class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full md:w-1/2 xl:w-1/3"
                    style="margin: 10px; width: 260px; background-color: black"
                  >
                    <div class="flex items-center" @click="redirigerExpire()">
                      <div class="flex-shrink-0">
                        <span
                          class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
                          style="color: #fff"
                          >{{ dates.length }}</span
                        >
                        <h3
                          class="text-base font-normal text-gray-500"
                          style="color: rgb(173 173 176)"
                        >
                          Domaines expirés
                        </h3>
                      </div>
                      <div
                        class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

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
                          <th scope="col" class="px-6 py-3">Nom Vps</th>
                          <th scope="col" class="px-6 py-3">Prix annuel</th>
                          <th scope="col" class="px-6 py-3">
                            Date d'expiration
                          </th>
                          <th scope="col" class="px-6 py-3">Adresse IP</th>
                          <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          v-for="domaine in List"
                          :key="domaine.id_vps"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            @click="redirigerVps(domaine.id_vps)"
                          >
                            {{ domaine.nom_vps }}
                          </th>
                          <td
                            class="px-6 py-4"
                            @click="redirigerVps(domaine.id_vps)"
                          >
                            {{ domaine.prix_annuel }}
                          </td>
                          <td
                            class="px-6 py-4"
                            @click="redirigerVps(domaine.id_vps)"
                            :class="{
                              classe: isDatePassed(domaine.date_expiration),
                            }"
                          >
                            {{ formatDate(domaine.date_expiration) }}
                          </td>
                          <td
                            class="px-6 py-4"
                            @click="redirigerVps(domaine.id_vps)"
                          >
                            {{ domaine.adresse_ip }}
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
                <!-- <v-snackbar
                  v-model="snackbar"
                  :timeout="timeout"
                  :color="color"
                  :top="top"
                  :bottom="bottom"
                  :left="left"
                  :right="right"
                >
                  {{ messages }}
                  <v-btn dark text @click="snackbar = false">Close</v-btn>
                </v-snackbar>
                <v-btn @click="showSnackbar">Show Snackbar</v-btn> -->
                <div class="mt-10 py-10 border-t border-gray-300 text-center">
                  <div class="flex flex-wrap justify-center">
                    <div class="w-full lg:w-9/12 px-4">
                      <p class="mb-4 text-lg leading-relaxed text-gray-800"></p>
                      <div class="modal-overlay" v-if="VpsT">
                        <div class="content">
                          <button
                            style="
                              background-color: rgb(0, 0, 0);
                              color: rgb(255, 255, 255);
                              padding-left: 10px;
                              padding-right: 10px;
                              border-radius: 5px;
                            "
                            class="close"
                            @click="
                              clean();
                              VpsT = false;
                            "
                          >
                            &times;
                          </button>
                          <input
                            type="text"
                            v-model="searchListV"
                            placeholder="Rechercher..."
                            style="
                              width: 100%;
                              border-radius: 10px;
                              border: 1px solid #888;
                              height: 40px;
                              margin-top: 35px;
                            "
                          />
                          <div
                            v-for="vps in List"
                            :key="vps.id_vps"
                            @click="redirigerVps(vps.id_vps)"
                          >
                            <div
                              style="
                                padding: 10px;
                                background-color: rgb(214 214 214);
                                border-radius: 10px;
                                width: 100%;
                                margin-top: 10px;
                                font-size: 18px;
                              "
                            >
                              <h2>{{ vps.nom_vps }}</h2>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="modal-overlay" v-if="show">
                        <div class="modal-content">
                          <span
                            class="close"
                            @click="
                              clean();
                              show = false;
                              vps = false;
                              domaine = false;
                              base = false;
                              sous = false;
                            "
                            >&times;</span
                          >
                          <h2
                            style="
                              font-size: 22px;
                              color: #000;
                              font-weight: 700;
                              margin: 10px;
                            "
                          >
                            Nouvel ajout
                          </h2>
                          <div v-if="vps">
                            <div class="input-group">
                              <input
                                v-model="nomV"
                                type="text"
                                class="input-field"
                                placeholder="Nom vps"
                              />
                              <input
                                v-model="nomH"
                                type="text"
                                class="input-field"
                                placeholder="Nom hote"
                              />
                            </div>
                            <div class="input-group">
                              <input
                                v-model="nomUV"
                                type="text"
                                class="input-field"
                                placeholder="Nom utilisateur"
                              />
                              <input
                                v-model="passwordV"
                                type="text"
                                class="input-field"
                                placeholder="Mot  de passe"
                              />
                            </div>
                            <div class="input-group">
                              <input
                                v-model="adresse_ip"
                                type="text"
                                class="input-field"
                                placeholder="Adresse IP"
                              />
                              <input
                                v-model="prix_vps"
                                type="text"
                                class="input-field"
                                placeholder="Prix annuel"
                              />
                            </div>
                            <div class="input-group">
                              <input
                                v-model="date_creation_vps"
                                type="date"
                                class="input-field"
                                placeholder="Date creation"
                              />
                              <input
                                v-model="date_expiration_vps"
                                type="date"
                                class="input-field"
                                placeholder="Date expiration"
                              />
                            </div>
                          </div>
                          <div v-if="domaine || sous">
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
                              <select v-model="domaine_id" v-if="sous">
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
                              <div class="input-group">
                                <input
                                  v-model="email_client"
                                  type="text"
                                  class="input-field"
                                  placeholder="email client"
                                />
                              </div>
                            </div>
                          </div>

                          <div v-if="base">
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
                              <select v-model="domaineB">
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
                          </div>
                          <button
                            v-if="vps"
                            class="closeBtn"
                            @click="
                              insertVps();
                              show = false;
                              vps = false;
                            "
                          >
                            Valider
                          </button>
                          <button
                            v-if="domaine || sous"
                            class="closeBtn"
                            @click="
                              insertDomaine();
                              show = false;
                              domaine = false;
                            "
                          >
                            Valider
                          </button>
                          <button
                            v-if="base"
                            class="closeBtn"
                            @click="
                              insertBase();
                              show = false;
                              base = false;
                            "
                          >
                            Valider
                          </button>
                        </div>
                      </div>
                    </div>
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
                      <div class="input-group">
                        <input
                          v-model="email_client"
                          type="text"
                          class="input-field"
                          placeholder="email client"
                        />
                      </div>
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
                      <h2>
                        Êtes-vous sûr(e) de vouloir supprimer cet élément ?
                      </h2>
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
                        <button class="cancel-button" @click="notDelete">
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import NavbarComponent from "../components/Navbar.vue";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";
// import Vue from "vue";
// import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";

// Vue.use(Vuetify);

export default {
  name: "profile-page",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      show: false,
      oneDomaine: false,
      message: "",
      allNotes: [],
      title: "",
      id: 0,
      delete: false,
      oneNote: false,
      not: "",
      searchQuery: "",
      showDropdown: false,
      vps: false,
      base: false,
      domaine: false,
      sous: false,
      nom_domaine: "",
      prix: "",
      email_client: "",
      client: "",
      date_creation: "",
      date_expiration: "",
      nom_hoteD: "",
      nom_userD: "",
      passwordD: "",
      vps1: "",
      domaine_id: "",
      adresse_ip: "",
      nomV: "",
      nomH: "",
      nomUV: "",
      passwordV: "",
      nomHB: "",
      nomUB: "",
      passwordB: "",
      lien: "",
      domaineB: "",
      nomB: "",
      allDomaines: "",
      edit: false,
      allVps: "",
      VpsT: false,
      allBase: "",
      searchListV: "",
      currentDate: new Date(),
      dates: "",
      prix_vps: "",
      date_creation_vps: "",
      date_expiration_vps: "",
      // snackbar: false,
      // messages: "Hello, Snackbar!",
      // timeout: 6000, // Durée en millisecondes avant que le Snackbar se ferme automatiquement
      // color: "success", // Couleur du Snackbar (peut être success, error, warning, info, ou une couleur personnalisée)
      // top: false, // Position du Snackbar
      // bottom: true,
      // left: false,
      // right: false,
    };
  },
  mounted() {
    this.getNote();
    this.getVps();
    this.getBase();
    this.oneDom(2);
  },

  methods: {
    showSnackbar() {
      this.snackbar = true;
    },
    async insertDomaine() {
      try {
        const response = await axios.post(
          "http://localhost:3000/insertDomaine",
          {
            nom: this.nom_domaine,
            prix_annuel: this.prix,
            client: this.client,
            email_client: this.email_client,
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

    async insertVps() {
      try {
        const response = await axios.post("http://localhost:3000/insertVps", {
          nom_vps: this.nomV,
          prix_annuel: this.prix_vps,
          date_creation: this.date_creation_vps,
          date_expiration: this.date_expiration_vps,
          nom_hote: this.nomH,
          nom_utilisateur: this.nomUV,
          mot_de_passe: this.passwordV,
          adresse_ip: this.adresse_ip,
        });
        console.log(response);
        this.getVps();
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async insertBase() {
      try {
        const response = await axios.post("http://localhost:3000/insertBase", {
          nom: this.nomB,
          nom_hote: this.nomHB,
          nom_utilisateur: this.nomUB,
          mot_de_passe: this.passwordB,
          lien: this.lien,
          domaine_id: this.domaineB,
        });
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
    deleteItem(id) {
      this.delete = true;
      this.id = id;
    },
    notDelete() {
      this.delete = false;
    },
    async UpdateNote() {
      try {
        const response = await axios.post(
          "http://localhost:3000/updateDomaine",
          {
            id: this.id,
            title: this.title,
            content: this.message,
          }
        );

        console.log(response);
        this.message = "";
        this.title = "";
        this.id = "";
        this.getNote();
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
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
            email_client: this.email_client,
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
    formatDate(value) {
      if (value) {
        return moment(value).utc().format("YYYY-MM-DD");
      }
      return "";
    },
    async onRecup(id) {
      for (let i of this.allDomaines) {
        if (i.id_domaine == id) {
          this.id = i.id_domaine;
          this.nom_domaine = i.nom;
          this.prix = i.prix_annuel;
          this.client = i.client;
          this.email_client = i.email_client;
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
    isDatePassed(date) {
      return new Date(date) < new Date();
    },
    async getNote() {
      try {
        const response = await axios.get("http://localhost:3000/getDomaine");
        this.allDomaines = response.data;
        this.dates = response.data.filter(
          (d) => new Date(d.date_expiration) < new Date(this.currentDate)
        );
        console.log("dates", this.dates);
      } catch (error) {
        console.error("Erreur lors de l'appel de l'API : ", error);
      }
    },
    async getVps() {
      try {
        const response = await axios.get(
          "https://devcosit.com/suivi/db/getVps"
        );
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
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.split(" ").splice(0, maxLength).join(" ") + "...";
      } else {
        return text;
      }
    },
    async oneDom(id) {
      for (let i of this.allDomaines) {
        if (i.id_domaine == id) {
          this.not = i;
        }
      }
    },
    rediriger(id) {
      this.$router.push({ path: "/details", query: { id_ex: id } });
    },
    redirigerVps(id) {
      this.$router.push({ path: "/vps", query: { id_vp: id } });
    },
    redirigerBase() {
      this.$router.push({ path: "/base" });
    },
    redirigerExpire() {
      this.$router.push({ path: "/expire" });
    },
    redirigerDo() {
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    scrollToBottom() {
      const container = this.$refs.scrollContainer;
      container.scrollTop = container.scrollHeight;
    },
    downloadAsPDF(on) {
      const documentDefinition = {
        content: [
          { text: on.title, style: "titleStyle" },
          { text: on.content },
        ],
        styles: {
          titleStyle: {
            bold: true,
            fontSize: 18,
            alignment: "center",
            margin: [0, 0, 0, 20], // Marge basse de 20 unités
          },
        },
      };
      const filename = `${on.title}.pdf`;
      pdfMake.createPdf(documentDefinition).download(filename);
    },
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
    List() {
      if (!this.searchListV) {
        return this.allVps;
      } else {
        return this.allVps.filter((item) =>
          item.nom_vps.toLowerCase().includes(this.searchListV.toLowerCase())
        );
      }
    },
  },
};
</script>
<style>
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
  background-color: #4af50c;
  color: #fff;
}

.cancel-button {
  background-color: #f44336;
  color: #fff;
  margin-left: 10px;
}
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #f1f1f1;
}
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.input-group input,
select {
  flex: 1;
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.classe {
  color: red;
}
</style>
