<template>
<div class="dropdown navbar-item is-active">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>地図を移動</span>
<span class="material-icons">
expand_more
</span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
          現在位置に移動(GPS)
      </a>
      <a class="dropdown-item">
          柳町に移動
      </a>
      <a href="#" class="dropdown-item is-active">
        柳町に移動
      </a>
      <a href="#" class="dropdown-item">
        柳町に移動
      </a>
      <hr class="dropdown-divider">
      <a href="#" class="dropdown-item">
        柳町に移動
      </a>
    </div>
  </div>
</div>
</template>
<style></style>
<script>
export default {
    
}
</script>