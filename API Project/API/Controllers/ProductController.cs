using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NHibernate.Collection.Generic;
using Persistance.Data;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseApiController
    {
    
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;
        public ProductController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment environment)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
            this.environment = environment; 
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await unitOfWork.Repository <Product>().CountAsync(countSpec);
            var products = await unitOfWork.Repository<Product>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(new Pagination<ProductToReturnDTO>(productParams.PageIndex,productParams.PageSize,totalItems,data));
        }   

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
            return _mapper.Map<Product ,  ProductToReturnDTO>(product);
        }
        // *****Admin

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateProdcut([FromForm]ProductDTO productDTO) 
        {
            if (productDTO.imageFile!=null) {
                SaveImage(productDTO);
            }
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
                 unitOfWork.Repository<Product>().Add(product);
                 var result =  await unitOfWork.Complete();
            if (result <= 0) { return BadRequest( new ApiResponse(400 ,"Bad Request Nothing Added") ); }

            return Ok();

        }
        [Authorize(Roles = "Admin")]
        [HttpPost("Brand")]
        public async Task<ActionResult> CreateBrand(BrandDTO barndDTO)
        {

            var productbrand = _mapper.Map<BrandDTO, ProductBrand>(barndDTO);
            unitOfWork.Repository<ProductBrand>().Add(productbrand);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("Category")]
        public async Task<ActionResult> CreateCategory(TypeDTO typeDTO)
        {

            var productType = _mapper.Map<TypeDTO,ProductType>(typeDTO);
            unitOfWork.Repository<ProductType>().Add(productType);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UPdateProdcut([FromForm]ProductDTO productDTO)
        {
            if (productDTO.imageFile != null)
            {
                SaveImage(productDTO);
            }
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            unitOfWork.Repository<Product>().Update(product);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }

            return Ok();

        }
        [Authorize(Roles = "Admin")]
        [HttpPut("Brand")]
        public async Task<ActionResult> UpdateBrand(BrandDTO barndDTO)
        {
            var productbrand = _mapper.Map<BrandDTO, ProductBrand>(barndDTO);
            unitOfWork.Repository<ProductBrand>().Update(productbrand);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("Category")]
        public async Task<ActionResult> UpdateCategory(TypeDTO typeDTO)
        {
            var productType = _mapper.Map<TypeDTO, ProductType>(typeDTO);
            unitOfWork.Repository<ProductType>().Update(productType);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProdcut(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);
            if (product != null)
            {
                unitOfWork.Repository<Product>().Delete(product);
                var result = await unitOfWork.Complete();
                if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
                return Ok();
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Bad Request Nothing Added"));
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Brand/{id}")]
        public async Task<IActionResult> DeleteBrand(int id )
        {
            var productbrand =  await unitOfWork.Repository<ProductBrand>().GetByIdAsync(id);
            var spce = new ProductWithSearchBrandIDSpecification(productbrand.ID);
            var product =  await unitOfWork.Repository<Product>().ListAsync(spce);
            if (product.Count >0)
            {
                return BadRequest(new ApiResponse(400, "Bad Request Nothing Delete"));
            }
            unitOfWork.Repository<ProductBrand>().Delete(productbrand);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Delete")); }
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Category/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var productType = await unitOfWork.Repository<ProductType>().GetByIdAsync(id);
            var spce = new ProductWithSearchTypeIDSpecification(productType.ID);
            var product = await unitOfWork.Repository<Product>().ListAsync(spce);
            if (product.Count > 0)
            {
                return BadRequest(new ApiResponse(400, "Bad Request Nothing Delete"));
            }
            unitOfWork.Repository<ProductType>().Delete(productType);
            var result = await unitOfWork.Complete();
            if (result <= 0) { return BadRequest(new ApiResponse(400, "Bad Request Nothing Added")); }
            return Ok();
        }

        [HttpGet("types")]

        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await unitOfWork.Repository<ProductType>().ListAllAsync());
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await unitOfWork.Repository<ProductBrand>().ListAllAsync());
        }

        [HttpGet("type/{id}")]
        public async Task<ActionResult<ProductType>> Gettype(int id)
        {
            var productType = await unitOfWork.Repository<ProductType>().GetByIdAsync(id);
            if (productType == null) return BadRequest(new ApiResponse(400, "Not found"));
            return Ok(productType);
        }
        [HttpGet("brand/{id}")]
        public async Task<ActionResult<ProductBrand>> Getbrand(int id)
        {
            var productbrand = await unitOfWork.Repository<ProductBrand>().GetByIdAsync(id);
            if (productbrand == null) return BadRequest(new ApiResponse(400, "Not found"));
            return Ok(productbrand);
        }
        [HttpGet("ProductWithBrandandtypeWithIDs/{id}")]
        public async Task<ActionResult<ProductBrand>> GetProductWithBrandandtypeWithIDs(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);
            if (product == null) return BadRequest(new ApiResponse(400, "Not found"));
            return Ok(product);
        }

        //[Authorize(Roles = "Admin")]
        //[HttpPost("Uploadimage")]
        //public async Task<ActionResult> Updoadimage() 
        //{
        //    var result = false;
        //    try
        //    {
        //       var uploadfiles = Request.Form.Files;
        //       foreach (IFormFile source in uploadfiles) 
        //        {
        //            string Filename = source.FileName;
        //            string Filepath =GetfilePath(Filename);
        //            if(!System.IO.Directory.Exists(Filepath))
        //            {
        //                System.IO.Directory.CreateDirectory(Filepath);
        //            }
        //            string imagepath = Filepath + "\\image.png";

        //            if (System.IO.File.Exists(imagepath))
        //            {
        //                System.IO.File.Delete(imagepath);
        //            }
        //            using (FileStream stream = System.IO.File.Create(imagepath)) 
        //            {
        //                await source.CopyToAsync(stream);
        //                result = true;
        //            }
        //        }
        //    }
        //    catch(Exception ex)
        //    {

        //    }

        //    return Ok(result);
        //}
        //[NonAction]
        //private string GetfilePath(string ProductId)
        //{
        //    return this._environment.WebRootPath + "\\Product\\images\\"+ProductId;
        //}
        [NonAction]
        public Tuple<int, string> SaveImage(ProductDTO product)
        {
            try
            {
                var contentPath = this.environment.ContentRootPath;
                // path = "c://projects/productminiapi/uploads" ,not exactly something like that
                var path = Path.Combine(contentPath, "wwwroot/Product/images");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                // Check the allowed extenstions
                var ext = Path.GetExtension(product.imageFile.FileName);
                var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg", ".PNG" };
                if (!allowedExtensions.Contains(ext))
                {
                    string msg = string.Format("Only {0} extensions are allowed", string.Join(",", allowedExtensions));
                    return new Tuple<int, string>(0, msg);
                }
                string uniqueString = Guid.NewGuid().ToString();
                // we are trying to create a unique filename here
                var newFileName = uniqueString + ext;
                product.imgUrl = newFileName;   
                var fileWithPath = Path.Combine(path, newFileName);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                product.imageFile.CopyTo(stream);
                stream.Close();
                return new Tuple<int, string>(1, newFileName);
            }
            catch (Exception ex)
            {
                return new Tuple<int, string>(0, "Error has occured");
            }
        }
    }

}
