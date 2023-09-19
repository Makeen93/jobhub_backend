const Job = require("../models/Job");
const User = require("../models/Job");
const CryptoJS = require("crypto-js");

module.exports = {
    createJob:async (req,res)=>{
        const newJob=new Job(req.body);
        try {
            const savedJob=await newJob.save();
            const {__v,createdAt,updatedAt,...newJobInfo}=savedJob._doc;
            res.status(201).json(newJobInfo);
        } catch (error) {
            res.status(500).json(error+"Makeen");
        }
    },
    updateJob: async (req, res) => {
        
        try {
            const UpdateJob = await Job.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true }
            );
            const {__v, createdAt, updatedAt,...updatedJobInfo } = updateJob._doc;
            res.status(200).json(updatedJobInfo);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },


    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id) 
            res.status(200).json("Job Successfully Deleted");
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    getJob: async (req, res) => {
        try {
            const job=await Job.findById(req.params.id);
            // const {password,__v,createdAt,updatedAt,...jobData}= job._doc;
            res.status(200).json(job);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    getAllJobs: async (req, res) => {
        try {
            const AllJobs=await Job.find();
            res.status(200).json(AllJobs);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    searchJobs:async (req, res) => {
        try {
            const results=await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobsearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).json(results);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

}