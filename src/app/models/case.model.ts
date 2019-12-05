

export interface Case {
    id: number;
    img: string;
    client: string;
    title: string;
    desc: string;
    link: string;
    category : string;
    industry: string;
    subCase: Case;
}