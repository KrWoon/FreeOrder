<template lang="html">
  <div>

      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron">
        <div class="container">
          <div class="row">

            <div class="col-md-4">
              <h1 class="display-3"> Menu </h1>
              <p>You can view, add, edit, and delete menu in here</p>
               <p> <br/> </p>
            </div>

            <div class="col-md-8">
              <!-- Add New Menu -->
              <p>
                <form v-on:submit.prevent="addMenu()" class="form-inline my-2 my-lg-0">              
                  <label for="inputMenuName"></label>   
                  <input type="text" class="form-control mr-sm-2" v-model="newMenu.Menu_Name" id="inputMenuName" placeholder="Menu" required autofocus>                                          
                
                  <label for="inputMenuPrice"></label>   
                  <input type="text" class="form-control mr-sm-2" v-model="newMenu.Price" id="inputMenuPrice" placeholder="Price" required>                                          
                
                  <label for="inputMenuCookingTime"></label>   
                  <input type="number" class="form-control mr-sm-2" v-model="newMenu.CookingTime" id="inputMenuCookingTime" placeholder="CookingTime" required>                                          
              
                  <button class="btn btn-primary my-2 my-sm-0" type="submit">Add</button>          
                </form> 
              </p>
              <!-- Add New Option -->
              <p>
                <form v-on:submit.prevent="addOption()" class="form-inline my-2 my-lg-0">
                  <label for="inputOptionName"></label>   
                  <input type="text" class="form-control mr-sm-2" v-model="newOption.MenuOption_Name" id="inputOptionName" placeholder="Option" required autofocus>                                          
                       
                  <label for="inputOptionPrice"></label>   
                  <input type="text" class="form-control mr-sm-2" v-model="newOption.Price" id="inputOptionPrice" placeholder="Price" required>                                          
                    
                  <button class="btn btn-primary my-2 my-sm-0" type="submit">Add</button>     
                </form> 
              </p>
            </div>

          </div>
        </div>
      </div>      

    <div class="container">
      <div class="row">
        <div class="col-md-7">
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Menu</th>
                        <th>Price</th>
                        <th>CookingTime</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(menu, index ) in menus">
                        <td> {{ index+1 }} </td>
                        <td> <button class="btn btn-block" v-on:click="clickMenu(menu.Menu_Code, menu.Menu_Name)"> {{ menu.Menu_Name }} </button> </td>
                        <td> {{ menu.Price }} </td>
                        <td> {{ menu.CookingTime }} </td>
                        <td>
                            <!-- <button class="btn btn-outline-danger" v-on:click="deleteMenu(menu.Menu_Code)">  -->
                              <button class="btn btn-outline-danger" v-confirm="{loader: true, ok: dialog => deleteMenu(dialog, menu.Menu_Code),  message: 'Are you sure you want to delete this menu?'}">
                                x 
                            </button>   
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Option</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(option, index ) in options">
                        <td> {{ index+1 }} </td>
                        <td> {{ option.MenuOption_Name }} </td>
                        <td> {{ option.Price }} </td>
                        <td>
                            <!-- <button class="btn btn-outline-danger" @click="deleteOption(option.MenuOption_Code)">  -->
                              <button class="btn btn-outline-danger" v-confirm="{loader: true, ok: dialog => deleteOption(dialog, option.MenuOption_Code),  message: 'Are you sure you want to delete this option?'}">
                                x 
                            </button>  
                        </td>
                    </tr>
                </tbody>
            </table> 
            </div>

        <div class="col-md-5" v-if="menuIsChecked">
          <form v-on:submit.prevent="addDetails(menuIsChecked)">
            <h2 align="center"> {{ clickedMenuName }}</h2>
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th>Prices</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="option in options">
                        <td> {{ option.MenuOption_Name }} </td>
                        <td> {{ option.Price }} </td>
                        <td>
                            <input type="checkbox"  :value="{Menu_Code: menuIsChecked, MenuOption_Code: option.MenuOption_Code}" v-model="details">
                        </td>       
                    </tr>                
                </tbody>
              </table>
              
              <div align="right">
                <button class="btn btn-primary my-2 my-sm-0 align" type="submit">Save</button>
              </div>
            </form>
          </div>

          </div>
    </div>

        <hr>

    <footer class="container">
      <p>&copy; BBGoo 2018</p>
    </footer>
  
  </div> 
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      options: [],
      details: [],
      clickedMenuName: '',
      menuIsChecked: 0,
      newMenu: {
        Menu_Name: "",
        Price: "",
        CookingTime: ''
      },
      newOption: {
        MenuOption_Name: "",
        Price: ""
      }

    }
  },
  created() {
    this.fetchMenus();
    this.fetchOptions();
  },
  methods: {
    fetchMenus() {
      this.axios.get('/menu/' + this.$route.params.id)
      .then(res => {
        this.menus = res.data;
        console.log(this.menus);
      })
      .catch(err => console.log(err));
    },
    fetchOptions() {
      this.axios.get('/menu/option/' + this.$route.params.id)
      .then(res => {
        this.options = res.data;
        console.log(this.options);
      })
      .catch(err => console.log(err));
    },
    clickMenu(id, name) {
      this.axios.get('/menu/details/' + id)
      .then(res => {
        this.details = res.data;
        this.menuIsChecked = id;
        this.clickedMenuName = name;

        console.log(this.details);
      })
      .catch(err => console.log(err));
    },
    addMenu() {
      this.axios.post('/menu/' + this.$route.params.id, this.newMenu)
      .then(res => {  
        this.fetchMenus();    
      })
      .catch(err => console.log(err));
    },
    addOption() {
      this.axios.post('/menu/option/' + this.$route.params.id, this.newOption)
      .then(res => {
        this.fetchOptions();        
      })
      .catch(err => console.log(err));
    },
    addDetails(id) {
      this.axios.post('/menu/details/' + id, this.details)
      .then(res => {
        this.$dialog.alert(res.data);
      })
      .catch(err => console.log(err));
    },
    deleteMenu(dialog, id) {
        this.axios.delete('/menu/' + id)
        .then(res => {
          this.fetchMenus();
          dialog.close();
        })
        .catch(err => console.log(err));

      // var response = confirm('Are you sure you want to delete this menu?');

      // if(response) {
      //   this.axios.delete('/menu/' + id)
      //   .then(res => {
      //     this.fetchMenus();
      //   })
      //   .catch(err => console.log(err));
      // }
    },
    deleteOption(dialog, id) {
      // var boolnum = 0;
      // this.$dialog.confirm('Are you sure you want to delete this option?')
      //   .then(function () {
      //     console.log(id);
      //     boolnum = 1;
      //     console.log(boolnum);    
      //   })
      //   .catch(function () {
      //     console.log('Clicked on cancel')
      //   });

          this.axios.delete('/menu/option/' + id)
          .then(res => {
            this.fetchOptions();
            dialog.close();
          })
          .catch(err => console.log(err));
          
      // var response = confirm('Are you sure you want to delete this option?');

      // if(response) {
      //   this.axios.delete('/menu/option/' + id)
      //   .then(res => {
      //     this.fetchOptions();
      //   })
      //   .catch(err => console.log(err));
      // }
    }
  }
}
</script>

<style>
body {
  padding-top: 3.5rem;
  background-color:white;
}
.textColor {
  color: #fff;
}
</style>

<style scoped>
.mycontainer {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .mycontainer {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .mycontainer {
    width: 1200px;
  }
}

@media (min-width: 1200px) {
  .mycontainer {
    width: 1200px;
  }
}

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }
.border-top-gray { border-top-color: #adb5bd; }

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

.lh-condensed { line-height: 1.25; }

</style>