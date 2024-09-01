package com.example.SchoolManagementSystem;

import java.util.List;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.DisciplinaCurso;
import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.model.Enums.EnumAutorizacao;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;
import com.example.SchoolManagementSystem.service.AlunoService;
import com.example.SchoolManagementSystem.service.CursoService;
import com.example.SchoolManagementSystem.service.DisciplinaCursoService;
import com.example.SchoolManagementSystem.service.DisciplinaService;
import com.example.SchoolManagementSystem.service.MatriculaDisciplinaService;
import com.example.SchoolManagementSystem.service.ProfessorService;
import com.example.SchoolManagementSystem.service.SecretariaService;
import com.example.SchoolManagementSystem.service.UsuarioService;

@SpringBootApplication
public class SchoolManagementSystemApplication implements CommandLineRunner {


	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private AlunoService alunoService;

	@Autowired
	private ProfessorService professorService;

	@Autowired
	private SecretariaService secretariaService;

	@Autowired
	private DisciplinaService disciplinaService;

	@Autowired
	private CursoService cursoService;

	@Autowired
	private DisciplinaCursoService disciplinaCursoService;
	
	@Autowired
	private MatriculaDisciplinaService matriculaDisciplinaService;

	private Scanner scanner = new Scanner(System.in);

	private Usuario usuarioLogged;

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
		while (true) {
			loginCLI();
		}
    }



	//  -------------- loginCLI ---------------
	public void loginCLI(){
		
		String email;
		String senha;

		System.out.println("Digite as credênciais de acesso: ");
		System.out.println("email: ");
		email = scanner.nextLine();
		System.out.println("senha: ");
		senha = scanner.nextLine();

		Usuario usuariolog = usuarioService.login(email, senha);

		this.usuarioLogged = usuariolog;
		System.out.println("usuário logado: " + this.usuarioLogged.getNome());

		switch (usuariolog.getTipo().getDescricao()) {
			case "PROFESSOR":
				professorCLI();
				break;
			case "SECRETARIA":
				secretariaCLI();
				break;
			case "ALUNO":
				alunoCLI();
				break;
		}

		System.out.println("Encerrando aplicação");

	}






	public void professorCLI() {
		boolean stay = true;
		int response;

		while (stay) {
			System.out.println("Digite uma das opcoes a baixo");
			System.out.println("01 - visualizar alunos em uma disciplina");
			System.out.println("00 - sair");	
			response = Integer.parseInt(scanner.nextLine());

			switch (response) {
				case 0:
					stay = false;
					break;
				case 1:

					break;
				default:
					throw new RuntimeException("Opção invalida");
			}	
		}


	}



	
	public void secretariaCLI(){
		int response;
		boolean stay = true;
		
		while (stay) {
			System.out.println("Digite uma das opções: ");
			System.out.println("01 - Cadastrar Aluno");
			System.out.println("02 - Cadastrar Professor");
			System.out.println("03 - Cadastrar Secretaria");
			System.out.println("04 - Cadastrar Disciplina");
			System.out.println("05 - Cadastrar Curso");
			System.out.println("06 - Adicionar disciplina a um curso: ");
			System.out.println("00 - sair: ");
			response = Integer.parseInt(scanner.nextLine());

			switch (response) {

				case 1:

					break;

				case 0:
					stay = false;
					break;

				default:
					throw new RuntimeException("Opção invalida");
			}
	
		}
	}
	// ------------------- Secretária CLI ----------------------- //
	public void cadastrarAluno(){

		String nome, senha, email, cpf;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();

		System.out.println("E-mail: ");
		email = scanner.nextLine().toLowerCase();

		System.out.println("senha: ");
		senha = scanner.nextLine();

		System.out.println("cpf: ");
		cpf = scanner.nextLine();

		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.ALUNO);
		alunoService.create(usuario.getId());
	
		System.out.println("Aluno criado com sucesso!" + usuario.getNome());
	}


	public void cadastrarProfessor(){

		String nome, senha, email, cpf;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();

		System.out.println("E-mail: ");
		email = scanner.nextLine();

		System.out.println("senha: ");
		senha = scanner.nextLine();

		System.out.println("cpf: ");
		cpf = scanner.nextLine();

		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.PROFESSOR);
		professorService.create(usuario.getId());
	
		System.out.println("Professor criado com sucesso!" + usuario.getNome());
		
	}


	public void cadastrarSecretaria(){

		String nome, senha, email, cpf;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();

		System.out.println("E-mail: ");
		email = scanner.nextLine();

		System.out.println("senha: ");
		senha = scanner.nextLine();

		System.out.println("cpf: ");
		cpf = scanner.nextLine();

		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.SECRETARIA);
		secretariaService.create(usuario.getId());
	
		System.out.println("Professor criado com sucesso!" + usuario.getNome());
		
	}

	public void cadastrarDisicplina() {

		String nome;
		int cargaHoraria, maximoAlunos;

		System.out.println("Digite o nome da Displina");
		nome = scanner.nextLine();

		System.out.println("Digite Carga Horaria da Disciplina:");
		cargaHoraria = scanner.nextInt();

		System.out.println("Digite o maximo de Alunos na Disciplina:");
		maximoAlunos = scanner.nextInt();

		long id = disciplinaService.createDisciplina(nome, cargaHoraria, maximoAlunos).getId();

		System.out.println("Salvo com sucesso! id: " + id);

	}

	public void cadastrarCurso() {

		String nome;

		System.out.println("Digite o nome do Curso");
		nome = scanner.nextLine();

		long id = cursoService.createCurso(nome).getId();

		System.out.println("Salvo com sucesso! id: " + id);

	}

	public void vincularDisciplinaCurso() {

		String tipoDisciplina;
		int periodo;

		List<Disciplina> disciplinas = disciplinaService.findAll(); 

		System.out.println("EScolha a Disciplina pelo Id");
		for (Disciplina disc : disciplinas) {
			System.out.println(disc.getId() + " - " + disc.getNome());
		}
		long idDisciplina = Long.parseLong(scanner.nextLine());
		
		Disciplina disciplina = disciplinaService.findById(idDisciplina);


		List<Curso> cursos = cursoService.findAllCurso();

		System.out.println("EScolha a Disciplina pelo Id");
		for (Curso curso : cursos) {
			System.out.println(curso.getId() + " - " + curso.getNome());
		}
		long idCurso = Long.parseLong(scanner.nextLine());

		Curso curso = cursoService.findById(idCurso);

		System.out.println("Digite o periodo da disciplina: ");
		periodo = Integer.parseInt(scanner.nextLine());

		System.out.println("Digite o tipo da disciplina (OBRIGATORIA/OPTATIVA)");
		tipoDisciplina = scanner.nextLine();

		disciplinaCursoService.createDisciplinaCurso(disciplina, curso, periodo, EnumDisciplina.valueOf(tipoDisciplina));

		System.out.println("Vinculo e Disciplina e Curso cadastrado com sucesso.");

	}








	public void alunoCLI(){
		boolean stay = true;
		int response;

		while(stay){

			System.out.println("Digite uma das opcoes a baixo: ");
			System.out.println("01 - matricurlar-se em disciplinas obrigatorias");
			System.out.println("02 - matricurlar-se em disciplinas optativas");
			System.out.println("00 - sair: ");
			response = Integer.parseInt(scanner.nextLine());
	
			switch (response) {
				case 1:
					
					break;
	
				case 0:
					stay = false;
					break;

				default:
					throw new RuntimeException("Opção invalida");
			}

		}

	}

	
	// ---------------------------- AlunoCLI -----------------------------//
	public void matricularAlunoDisciplinaOptativa(){

		List<Disciplina> disciplinas = disciplinaService.findAll(); 

		System.out.println("Selecione a disciplina por ID: ");
		for (Disciplina disciplina : disciplinas) {
			System.out.println(disciplina.getId() + " - " + disciplina.getNome());
		}

		Long idDisciplina = Long.parseLong(scanner.nextLine());
		
		Disciplina disciplina = disciplinaService.findById(idDisciplina);

		Aluno aluno = alunoService.findById(this.usuarioLogged.getId());

		matriculaDisciplinaService.create(aluno, disciplina);

		System.out.println("A sua matricula na disciplina de"  + disciplina.getNome() + "foi realizada com sucesso.");

	}



	/*
	 * Filtrando disciplinas por curso e tipo
	 * 
	 * 	Long id = Long.parseLong("1");
		Curso curso = cursoService.findById(id);
		List<DisciplinaCurso> disciplinasCursos = disciplinaCursoService.findByCursoAndTipo(curso, EnumDisciplina.valueOf("OPTATIVA"));

		for(DisciplinaCurso disciplinasCurso : disciplinasCursos){
			System.out.println(disciplinasCurso.getDisciplina().getNome() + disciplinasCurso.getTipo().getDescricao());
		}


	 */
	


}
