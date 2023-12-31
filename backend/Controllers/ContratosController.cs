﻿using backend.Model;
using backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace backend.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ContratosController : ControllerBase
    {
        private readonly ContratoService _repo;

        public ContratosController(ContratoService repo)
        {
            _repo = repo;
        }

        [EnableQuery]
        [HttpGet]
        public IQueryable<Contrato> Get()
        {
            return _repo.GetAll();
        }

        [EnableQuery]
        [HttpGet("{id}")]
        public SingleResult<Contrato> Get([FromODataUri] int key)
        {
            return SingleResult.Create(_repo.GetById(key));
        }

        [HttpDelete]
        public IActionResult Delete([FromODataUri] int key)
        {
            var contratoToDelete = _repo.GetById(key);
            _repo.Delete(contratoToDelete.First());

            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contrato contrato)
        {
            _repo.Create(contrato.Servicio.IdServicio, contrato.Cliente.IdCliente);
            return NoContent();
        }
    }
}
