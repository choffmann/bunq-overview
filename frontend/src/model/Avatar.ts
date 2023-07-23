export interface Avatar {
    uuid: string;
    anchor_uuid?: string;
    image: Image[];
    style?: string;
}

export interface Image {
    attachment_public_uuid: string;
    content_type: string;
    height: number;
    width: number;
}