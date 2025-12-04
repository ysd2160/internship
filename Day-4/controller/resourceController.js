import { Resource } from "../models/resourceModel.js";

export const createResource = async (req, res) => {
  try {
    const { title, description, category, status, amount } = req.body;

    const resource = await Resource.create({
      title,
      description,
      category,
      status,
      amount,
      createdBy: req.user, // added from auth middleware
    });

    return res.status(201).json({
      message: "Resource created successfully",
      success: true,
      data: resource,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.user });

    return res.status(200).json({
      success: true,
      data: resources,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: resource,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      message: "Resource updated successfully",
      success: true,
      data: updated,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      message: "Resource deleted successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
