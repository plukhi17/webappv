export interface Plant {
    additional_info: { dashboardId?: string, faultSheet?: string };
    app_object_id: string;
    created_by: string;
    created_on: string;
    delete_flag: boolean;
    description: string;
    id: number;
    modified_by: string;
    modified_on: string;
    name: string;
    plant_type: number;
    tenant_id: number;
}