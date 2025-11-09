import mongoose from "mongoose";

const guiaSchema = new mongoose.Schema({
  remitente: {
    name: String,
    phone: String,
    address_line: String,
    city: String,
    province: String,
    country: String,
    lat: Number,
    lng: Number
  },
  destinatario: {
    name: String,
    phone: String,
    address_line: String,
    city: String,
    province: String,
    country: String,
    lat: Number,
    lng: Number
  },
  items: [
    {
      sku: String,
      description: String,
      qty: Number,
      weight_kg: Number,
      value_usd: Number
    }
  ],
  service: String,
  payment: {
    method: { type: String, default: "prepaid" },
    payer: String
  },
  insurance: {
    declared_value_usd: Number
  },
  activo: { type: Boolean, default: true },
  estado: { type: String, enum: ["Pendiente", "En tránsito", "Entregado"], default: "Pendiente" },
  fecha_creacion: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Guia", guiaSchema);
