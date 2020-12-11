const resume = require('./resumeData');

exports.register = (summary,name,email,phone,website,company_name,time,role,company_summary,project_name,project_website, project_description, college, degree, duration, skills)=>
    new Promise((resolve, reject)=>{
        const newUser = new resume({ 
            summary: summary,
            name: name,
            email: email,
            phone: phone,
            website: website,
            company_name: company_name,
            time: time,
            role: role,
            company_summary: company_summary,
            project_name: project_name,
            project_website: project_website,
            project_description: project_description,
            college: college,
            degree: degree,
            duration: duration,
            skills: skills
        });
        
        newUser.save()
        .then(()=> resolve({status: 201, message: 'Resume Registered Successfully'}))       
            .catch(err => {
                if(err.code == 11000){
                    reject({status: 409, message: 'User Already Registered'});
                } else {
                    reject({status: 500, message: 'Internal Server Error !'});
                }

            });
    });