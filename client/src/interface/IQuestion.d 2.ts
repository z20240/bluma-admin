export interface IQuestion {
    id: number,
    question: string,
    answers: IOption[],
    correct: number
}

export interface IOption {
    id: number,
    option: string
}
