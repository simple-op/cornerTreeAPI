const Users = require('../models/users');
const jobs = require('../models/jobs');

const Status=[
     "Negative","Travelled-Quarantine","Symptoms-Quarantine","Positive-Admit"
]



//register a new job based on phone number 
module.exports.register = async function(req,res){
     console.log("dsadas")
    try{        
       
        
                   
           
                jobs= await jobs.create(req.body);
                jobs = await jobs.findById(jobs._id);
                return res.status(200).json({
                    message:  'jobs Registered Success!!',
                    jobs_details:  jobs        
                });
            
        }
        
        
    
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error in registering the jobs",        
        })
    }
    
}

//create report for a jobs
module.exports.createReport = async function(req,res){
    
    try{
        //Users can be found using req.user.id
        let Users = await Users.findById(req.user.id);
        if(!Users){
            return res.status(500).json({
                message: "Error in finding Users's account, Please login again"        
            });
        }
        //jobs can be found using req.param.id
        let jobs = await jobs.findById(req.params.id);
        

        if(!jobs){
            return res.status(500).json({
                message: "Error in finding jobs, please make sure that the pateint is registered"        
            });
        }
        //status can be found using req.body.status
        let status = Status[req.body.status]
        if(!status){
            return res.json(500,{
                message: "Invalid status code selected, please try again with a valid status code"        
            });
        }

        //create report
        let report = await Report.create({
            status: status ,
            Users: Users,
            jobs: patient,
            Date: new Date().toDateString()
            
        })

        //fetch the required details from the new report
        report = await Report
        .findById(report._id)
        .populate('Users')
        .populate('jobs')
        return res.json(200,report);
        
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error in creating a new report for the jobs",        
        })
    }
    
}


//fetch all reports for a patient(oldest to newest) 
module.exports.allReports = async function(req,res){

    try{
        //patient can be found from req.param.id
        let job = await jobs.find({});
        if(!job){
            return res.status(500).json({
                message: "Error in finding the job",        
            })

           
        }
        return res.status(200).json({jobs:jobs});
    }

     

        
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error in fetching the reports!",        
        })
    }
}