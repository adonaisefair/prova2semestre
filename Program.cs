using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1 Jose Adonai");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }

    tarefa.Categoria = categoria;

    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var existingtarefas= await ctx.Tarefas.FindAsync(id);
    if (existingtarefas== null)
    {
        return Results.NotFound($"{id} a tarefa não foi encontrada.");
    }
    existingTarefas.Nome = tarefas.Novoome;
    existingTarefas.Descricao = tarefas.NovaDescricao;
    existingTarefas.Id = tarefas.Id;
    existingTarefas.Status = tarefas.NovoStatus;

    await ctx.SaveChangesAsync();

    return Results.Ok(existingTarefas);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = await if("Não iniciada" || "Em andamento" == tarefas.Status).ToListAsync();
    if (tarefasNaoConcluidas.Any())
    {
        return Results.Ok("Existem tarefas não concluidas");
    }
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = await if("Concluido" == tarefas.Status).ToListAsync();
    if (tarefasNaoConcluidas.Any())
    {
        return Results.Ok("Tarefas Concluidas");
    }
});

app.Run();
