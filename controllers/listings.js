const listing=require("../models/listing.js");
module.exports.index=async(req,res)=>{
    const alllisting =  await listing.find({});
            res.render("listings/index.ejs",{alllisting});
    
    
    };

module.exports.renderNewFrom=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
  
    const listings=await listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!listings){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
}

module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;

    const newListings=await new listing(req.body.listing);
    newListings.owner=req.user._id;
    newListings.image={url,filename};
    await newListings.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
    

}


module.exports.renderEditFrom=async(req,res)=>{

    let {id}=req.params;
    const listings=await listing.findById(id);
    if(!listings){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
   let originalImageUrl= listings.image.url;
  originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");

    res.render("listings/edit.ejs",{listings,originalImageUrl});
}

module.exports.updateListing=async(req,res)=>{
    
    let {id}=req.params;
if(typeof req.file !=="undefined"){
   let Listing= await listing.findByIdAndUpdate(id,{...req.body.listing});
   let url=req.file.path;
   let filename=req.file.filename;
   Listing.image={url,filename};
   await Listing.save();
}
    req.flash("success","listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
  await  listing.findByIdAndDelete(id);
  req.flash("success","listing Deleted!");
  res.redirect("/listings");
}