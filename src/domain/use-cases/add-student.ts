export interface AddStudent {
	add(data: AddStudent.Params): Promise<AddStudent.Result>;
}

export namespace AddStudent {
	export interface Params {
		name: string;
		cpf: string;
		responsible: string;
	}

	export interface Result {
		id: number;
		name: string;
		cpf: string;
		responsible: string;
	}
}
