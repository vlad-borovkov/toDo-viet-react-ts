class TodoistAPI {
  private _domain: any;
  constructor({ domain }) {
    this._domain = domain;
  }

  makeRequest(url: string, method = 'GET', body: any) {
    const requestUrl = this._domain + url;
    const jwt = '52606cdb5e8c921b7d3269f5d83d6b93ee1ccf2a';

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

  getTaskById(taskId) {
    const taskFromServer = `/tasks/${taskId}`;
    return this.makeRequest(taskFromServer);
  }

  closeTask(taskId) {
    const requestUrl = `https://api.todoist.com/rest/v2/tasks/${taskId}/close`;
    const jwt = '52606cdb5e8c921b7d3269f5d83d6b93ee1ccf2a';

    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response;
    });
  }

  reopenTask(taskId) {
    const reopenedTask = `/tasks/${taskId}/reopen`;
    return this.makeRequest(reopenedTask, 'POST');
  }

  changeTaskDataById(taskData: TNewDataTask, taskId: String) {
    const requestUrl = `/tasks/${taskId}`;
    return this.makeRequest(requestUrl, 'POST', taskData);
  }

  deleteTask(taskId) {
    const requestUrl = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
    const jwt = '52606cdb5e8c921b7d3269f5d83d6b93ee1ccf2a';

    return fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response;
    });
  }
}

export const todoistAPI = new TodoistAPI({
  domain: 'https://api.todoist.com/rest/v2', //
});
