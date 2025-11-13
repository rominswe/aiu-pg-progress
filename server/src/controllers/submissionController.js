import { models } from "../config/db.js";
const Submission = models.submission;

export const listSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({ order: [['submittedDate', 'DESC']] });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubmission = async (req, res) => {
  try {
    const created = await Submission.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Submission.findByPk(id);
    if (!sub) return res.status(404).json({ message: "Submission not found" });
    await sub.update(req.body);
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

