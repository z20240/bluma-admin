export interface IQueryOption {
    startTime: string,
    endTime: string
}

export interface IDetail {
    id: number,
    correct: boolean
}

export interface IAnswer {
    ip: string,
    time: string,
    score: number,
    details: IDetail[]
}

export interface ILog extends IAnswer {
    id: number
}
