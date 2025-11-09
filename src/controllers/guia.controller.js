import Guia from "../models/guia.model.js";

export const crearGuia = async (req, res) => {
  try {
    const nueva = new Guia(req.body);
    const saved = await nueva.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listarGuias = async (req, res) => {
  try {
    const { activo, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (activo !== undefined) query.activo = activo === "true";
    if (search) {
      query.$or = [
        { "remitente.name": { $regex: search, $options: "i" } },
        { "destinatario.name": { $regex: search, $options: "i" } },
        { _id: search }
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Guia.countDocuments(query);
    const data = await Guia.find(query).sort({ fecha_creacion: -1 }).skip(skip).limit(Number(limit));
    res.json({ total, page: Number(page), limit: Number(limit), data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const buscarGuia = async (req, res) => {
  try {
    const guia = await Guia.findById(req.params.id);
    if (!guia) return res.status(404).json({ message: "Guía no encontrada" });
    res.json(guia);
  } catch (err) {
    res.status(400).json({ message: "ID inválido" });
  }
};

export const actualizarGuia = async (req, res) => {
  try {
    const updated = await Guia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Guía no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
