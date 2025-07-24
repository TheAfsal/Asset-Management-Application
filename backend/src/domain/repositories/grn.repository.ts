import { GrnHeader, GrnLineItem } from "../entities/grn.entity";
import { CreateGrnDto, UpdateGrnDto } from "../../application/dtos/grn.dto";

export interface GrnRepository {
  createGrn(header: GrnHeader, lineItems: GrnLineItem[]): Promise<GrnHeader>;
  updateGrn(id: number, dto: UpdateGrnDto): Promise<GrnHeader>;
  findAll(): Promise<GrnHeader[]>;
  findById(id: number): Promise<GrnHeader | null>;
  deleteGrn(id: number): Promise<void>;
}
