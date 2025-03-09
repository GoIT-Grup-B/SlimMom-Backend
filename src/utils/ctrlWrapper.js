export const ctrlWrapper = (controller)=>{
    async(req, res, next)=>{
        controller((req, res, next));
    }
}