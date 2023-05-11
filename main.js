document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("user-info");
  axios.get('https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data')
    .then((response) => {
      const users = response.data;
      users.forEach((user, index) => {
        const listItem = document.createElement("li");
        const text = document.createTextNode(user.FULLNAME + " " + user.EMAIL);
        listItem.appendChild(text);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete User";
        deleteButton.setAttribute("id", "btn" + index);
        deleteButton.addEventListener("click", () => {
          deleteUser(user._id, listItem);
        });
        listItem.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.textContent ="Edit User";
        editButton.setAttribute("id", "btn1" + index);
        editButton.setAttribute("data-id", user._id);
        editButton.addEventListener('click', event => {
          const id = event.target.dataset.id;
          editData(user._id, listItem);
        });
        listItem.appendChild(editButton);

        userInfo.appendChild(listItem);
      });
    })
    .catch((error) => {
      document.body.innerHTML = "<h3>Something went wrong</h3>";
      console.error(error);
    });
});

  
function postData(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  const fullName = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post("https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data", {
      FULLNAME: fullName,
      EMAIL: email,
      PASSWORD: password,
    })
    .then((response) => {
      console.log(response);
      // Fetch the updated data from the API
      axios.get("https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data")
        .then((response) => {
          const users = response.data;
          const userInfo = document.getElementById("user-info");
          userInfo.innerHTML = ""; // Clear the previous user info
          users.forEach((user, index) => {
            const listItem = document.createElement("li");
            const text = document.createTextNode(user.FULLNAME + " " + user.EMAIL);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete User";
            deleteButton.setAttribute("id", "btn" + index);
            deleteButton.addEventListener('click', () => {
              deleteUser(user._id, listItem);
            });
            const editButton = document.createElement("button");
            editButton.textContent = "Edit User";
            editButton.setAttribute("id", "btn1" + index);
            editButton.addEventListener('click', () => {
              editData(user._id, listItem);
            });
            listItem.appendChild(text);
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
            userInfo.appendChild(listItem);
          });
        })
        .catch((error) => {
          document.body.innerHTML = "<h3>Something went wrong</h3>";
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
      // Handle the error if needed
    });
}

const form = document.querySelector("#form"); // Get the form element
form.addEventListener("submit", postData); // Add the event listener to the form's submit event instead of the button's click event.

  function deleteUser(userId, listItem) {
    axios.delete(`https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data/${userId}`)
      .then(() => {
        // Remove the HTML element associated with the deleted user
        listItem.remove();
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if needed
      });
  }
  
  function editData(userId, listItem) {
   
    let newname="";
    let newemail="";
    let newpass="";
    axios.get(`https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data/${userId}`)
    .then((response) => {
      newname=response.data.FULLNAME;
      newemail=response.data.EMAIL;
      newpass=response.data.PASSWORD;
    })
    .catch((error) => {
      console.error(error);
      // Handle the error if needed
    });

    axios.delete(`https://crudcrud.com/api/cc6f0c99a2aa4a25bf57a62d26cb86b6/data/${userId}`)
    .then(() => {
      // Remove the HTML element associated with the deleted user
      listItem.remove();
      document.getElementById('fullname').value=newname;
      document.getElementById('email').value=newemail;
      document.getElementById('password').value=newpass;
      document.getElementById('cnfpassword').value=""
    })
    .catch((error) => {
      console.error(error);
      // Handle the error if needed
    });
    
  }
  
  
  
  