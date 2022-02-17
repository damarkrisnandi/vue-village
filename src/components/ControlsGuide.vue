<template>
  <div md-theme="selection-black">
      <md-list md-expand-single="true">
            <md-list-item md-expand md-expanded.sync="true">
            <md-icon>gamepad</md-icon>
            <span class="md-list-item-text">Controls</span>

            <md-list slot="md-expand">
                <md-divider></md-divider>
                <div v-for="control in controls" :key="control.id">
                <md-divider v-if="control.divider"></md-divider>
                <md-list-item>
                    <span class="md-list-item-text">{{ control.action }}</span>
                    <md-badge class="md-square md-secondary" :md-content="control.key" />
                </md-list-item>
            </div>
          </md-list>
        </md-list-item>
          <!-- <md-subheader>Controls</md-subheader> -->
          
        
    </md-list>
  </div>
</template>

<script>
export default {
    data: () => {
        return {
            controls: [
                {id: 1, action: "Move Up", key: 'W'},
                {id: 2, action: "Move Left", key: 'A'},
                {id: 3, action: "Move Down", key: 'S'},
                {id: 4, action: "Move Right", key: 'D'},
                
                {id: 5, action: "Inventory", key: 'I', divider: true},
            ]
        }
    }
}
</script>

<style>

</style>