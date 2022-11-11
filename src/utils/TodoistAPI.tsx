class TodoistAPI {
  private _domain: any;
  constructor({ domain }) {
    this._domain = domain;
  }

  makeRequest(url: string, method = 'GET', body: any) {
    const requestUrl = this._domain + url;
    const jwt = '8f631ee64998440c6f5d01e04dbebe6bda5dd2c1';

    return fetch(requestUrl, {
      method: method,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      return response.json();
    });
  }

  addNewTask(taskData) {
    const addNewTask = '/tasks';
    return this.makeRequest(addNewTask, 'POST', taskData);
  }

  getActiveTasks() {
    const tasksFromServer = '/tasks';
    return this.makeRequest(tasksFromServer);
  }

  closeTask(taskId) {
    const closedTask = `/tasks/${taskId}/close`;
    return this.makeRequest(closedTask, 'POST');
  }

  reopenTask(taskId) {
    const reopenedTask = `/tasks/${taskId}/reopen`;
    return this.makeRequest(reopenedTask, 'POST');
  }

  changeTaskDataById(taskId, taskData) {
    const requestUrl = `/tasks/${taskId}`;
    return this.makeRequest(requestUrl, 'POST', taskData);
  }

  deleteTask(taskId) {
    const deletedTask = `/tasks/${taskId}`;
    return this.makeRequest(deletedTask, 'DELETE');
  }
}

export const todoistAPI = new TodoistAPI({
  domain: 'https://api.todoist.com/rest/v2', //
});
