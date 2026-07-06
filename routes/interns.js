const express = require("express");
const router = express.Router();

const db = require("../db");

// =====================
// GET ALL INTERNS
// =====================
router.get("/", (req, res) => {

    db.query("SELECT * FROM interns", (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching interns"
            });
        }

        res.status(200).json(results);

    });

});

// =====================
// ADD INTERN
// =====================
router.post("/", (req, res) => {

    const { name, email, department, phone } = req.body;

    if (!name || !email || !department || !phone) {

        return res.status(400).json({
            message: "Please fill in all fields"
        });

    }

    const sql = `
        INSERT INTO interns
        (name,email,department,phone)
        VALUES (?,?,?,?)
    `;

    db.query(sql,
        [name, email, department, phone],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to add intern"
                });
            }

            res.status(201).json({
                message: "Intern added successfully"
            });

        });

});

// =====================
// UPDATE INTERN
// =====================
router.put("/:id", (req, res) => {

    const { name, email, department, phone } = req.body;

    const sql = `
        UPDATE interns
        SET name=?, email=?, department=?, phone=?
        WHERE id=?
    `;

    db.query(sql,
        [name, email, department, phone, req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Update failed"
                });
            }

            res.json({
                message: "Intern updated successfully"
            });

        });

});

// =====================
// DELETE INTERN
// =====================
router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM interns WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    message: "Delete failed"
                });

            }

            res.json({
                message: "Intern deleted successfully"
            });

        });

});

module.exports = router;