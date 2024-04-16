<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{ hidden: !showMenu, block: showMenu }"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <button
              class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
              type="button"
              style="transition: all 0.15s ease 0s"
              @click="this.delete = true"
            >
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
            <!-- <img
              style="width: 100px; height: 100px; border-radius: 50%"
              src="https://img.freepik.com/vecteurs-libre/garcon-aux-cheveux-boucles-lisant-livre_1308-146305.jpg?w=740&t=st=1708005760~exp=1708006360~hmac=ca8b2906ad4b361b59df25ab1d24cdd54e537607948f544b89f7f5919f1a7825"
              alt=""
            /> -->
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.delete === true">
      <div class="box">
        <div class="confirmation-content">
          <h2>Êtes-vous sûr(e) de vouloir vous deconnecter ?</h2>

          <div class="buttons">
            <button
              class="confirm-button"
              @click="
                deconnecter();
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
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
      delete: false,
    };
  },
  methods: {
    deconnecter() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
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
  background-color: #701d17;
  color: #fff;
}

.cancel-button {
  background-color: #000;
  color: #fff;
  margin-left: 10px;
}
</style>
