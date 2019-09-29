export class TodoItem {

  constructor(
    public id: number,
    public todoListId: number,
    public name: string,
    public done: boolean
) {}
}
