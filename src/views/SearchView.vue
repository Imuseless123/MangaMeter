<template>
  <div class="container">
    <div class="left-half">
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-bar" />
          <div class="rectangle-list">
            <div class="rectangle">Item 1</div>
            <div class="rectangle">Item 2</div>
            <div class="rectangle">Item 3</div>
            <!-- Add more rectangles as needed -->
          </div>
      </div>
      
    </div>
    <div class="right-half">Right Half</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  display: flex;
  height: 100%; 
}
.search-container{
  height: 80%;
  width: 80%;
  background-color: red;
}

.left-half {
  flex: 1; /* Takes 50% of the container */
  background-color: lightblue; /* Change to your desired color */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
}

.right-half {
  flex: 1; /* Takes 50% of the container */
  background-color: lightcoral; /* Change to your desired color */
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-bar{
  width: 100%;
  height: 40px;
  border: 0px;
  padding: 0px;
  border-radius: 6px;
}
.rectangle-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px; /* Space between rectangles */
}

.rectangle {
  height: 50px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
