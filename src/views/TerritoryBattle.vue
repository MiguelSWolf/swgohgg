<template>
  <div class="territory-battle">
    <form
      class="modal"
      @submit.prevent="addPoints"
      :class="{ 'is-active': formPoints.show }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add points</p>
          <button
            class="delete"
            @click="cancelModal"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Day</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="field has-addons">
                  <p class="control" v-for="n in 4" :key="n">
                    <button
                      type="button"
                      class="button is-large"
                      :class="{ 'is-info': n == formPoints.day }"
                      @click.prevent="formPoints.day = n"
                    >
                      <span>{{ n }}º Day</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Zone</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="select is-large">
                  <select v-model="formPoints.zone">
                    <option value="phase1.top">Phase 1 - Top</option>
                    <option value="phase1.middle">Phase 1 - Middle</option>
                    <option value="phase1.bottom">Phase 1 - Bottom</option>
                    <option value="phase2.top">Phase 2 - Top</option>
                    <option value="phase2.middle">Phase 2 - Middle</option>
                    <option value="phase2.bottom">Phase 2 - Bottom</option>
                    <option value="phase3.top">Phase 3 - Top</option>
                    <option value="phase3.middle">Phase 3 - Middle</option>
                    <option value="phase3.bottom">Phase 3 - Bottom</option>
                    <option value="phase4.top">Phase 4 - Top</option>
                    <option value="phase4.middle">Phase 4 - Middle</option>
                    <option value="phase4.bottom">Phase 4 - Bottom</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Value</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="field has-addons">
                  <div class="control">
                    <input
                      class="input is-large"
                      v-model="formPoints.value"
                      type="number"
                      placeholder="Text input"
                    />
                  </div>
                  <div class="control">
                    <a class="button is-large is-static">
                      000.000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <input
            type="submit"
            class="button is-success is-large"
            value="Save changes"
          />
          <button class="button is-large" @click="cancelModal">Cancel</button>
        </footer>
      </div>
    </form>
    <div class="control">
      <div class="button is-large is-primary" @click="openModal">
        Input Points
      </div>
    </div>
    <div class="map">
      <div v-for="n in 4" :key="n">
        <div v-for="zone in ['top', 'middle', 'bottom']" :key="zone">
          <progressBar
            :pointsNeeded="tb['phase' + n][zone]"
            :pointsMade="pointsMade"
            :name="`phase${n}.${zone}`"
          />
          <div class="text">
            <p v-for="(points, index) in tb['phase' + n][zone]" :key="points">
              {{ formatNumber(points) }} to
              <span v-for="n in index + 1" :key="n">*</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import progressBar from "../components/progressBar.vue";
export default {
  components: { progressBar },
  data() {
    return {
      tb: {
        phase1: {
          top: [42475000, 84950000, 141580000],
          middle: [110240000, 166640000, 256370000],
          bottom: [86275000, 120425000, 179740000]
        },
        phase2: {
          top: [71075000, 133535000, 215380000],
          middle: [96220000, 174235000, 260055000],
          bottom: [121030000, 217235000, 310335000]
        },
        phase3: {
          top: [91395000, 152325000, 217610000],
          middle: [132310000, 257065000, 378035000],
          bottom: [110615000, 165925000, 221230000]
        },
        phase4: {
          top: [122490000, 340255000, 453670000],
          middle: [152945000, 270930000, 436980000],
          bottom: [117510000, 268600000, 335750000]
        }
      },
      pointsMade: [],
      formPoints: {
        show: false,
        day: 1,
        name: "",
        value: 0
      }
    };
  },
  watch: {
    pointsMade(newVal) {
      localStorage.setItem("pointsMadeLS", JSON.stringify(newVal));
    }
  },
  mounted() {
    if (localStorage.pointsMadeLS)
      this.pointsMade = JSON.parse(localStorage.getItem("pointsMadeLS"));
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    cancelModal: function() {
      this.formPoints.show = false;
    },
    addPoints: function() {
      this.pointsMade.push({
        day: this.formPoints.day,
        zone: this.formPoints.zone,
        value: parseInt(this.formPoints.value) * 1000000
      });
      this.cancelModal();
    },
    openModal: function() {
      this.formPoints.show = true;
      this.formPoints.day = 1;
      this.formPoints.name = "";
      this.formPoints.value = 0;
    }
  }
};
</script>
<style lang="scss">
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > div {
    border: 1px solid #ccc;
    box-sizing: border-box;
    & > div {
      border: none;
      border-bottom: 1px solid #ccc;
      height: 200px;
      width: 24vw;
      padding: 5px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.modal {
  &:before {
    display: none;
  }
}
.label {
  color: #333;
}
</style>
