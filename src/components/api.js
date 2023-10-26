const source = "https://todo.pohy.eu";

function getRequest() {
  fetch(source, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Nepodařilo se načíst data.");
      }
    })
    .then((data) => {
      console.log("Dat, kde vyfiltruju completed === true:", data);
      const onlyCompletedTasks = data.filter((task) => task.completed === true);
      const onlyCompletedTasksIds = onlyCompletedTasks.map((task) => task.id);
      console.log("only completed", onlyCompletedTasksIds);
    })
    .catch((error) => {
      console.error("Chyba:", error);
    });
}

function deleteAllRequest() {
  fetch(source, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Smazáno úspěšně.");
      } else {
        throw new Error("Chyba v DELETE požadavku");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function postRequest(newTask) {
  const postData = { title: newTask };

  return fetch(source, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("POST požadavek byl úspěšný.");
        return response.json();
      } else {
        console.error("Chyba při POST požadavku.");
      }
    })
    .then((data) => {
      const id = data.id;
      return id;
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteTaskRequest(id) {
  const apiUrl = "https://todo.pohy.eu/" + id;

  fetch(apiUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Objekt byl úspěšně smazán.");
      } else {
        console.error("Chyba při mazání objektu.");
      }
    })
    .catch((error) => {
      console.error("Chyba při provádění DELETE požadavku:", error);
    });
}

function updateTaskRequest(updatedTask) {
  const apiUrl = "https://todo.pohy.eu/" + updatedTask.id;

  const updateData = {
    title: updatedTask.text,
    completed: updatedTask.completed,
  };

  fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Objekt byl úspěšně aktualizován.");
        return response.json();
      } else {
        throw new Error("Chyba při aktualizaci objektu.");
      }
    })
    .catch((error) => {
      console.error("Chyba při provádění PUT nebo PATCH požadavku:", error);
    });
}

export {
  getRequest,
  postRequest,
  deleteAllRequest,
  deleteTaskRequest,
  updateTaskRequest,
};
