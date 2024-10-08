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
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;
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
			try{
				loginCLI();
			}catch(Exception e){
				System.out.println("Error: " + e.getMessage());
			}
		}
    }



	//  -------------- loginCLI ---------------
	public void loginCLI(){
		
		String email;
		String senha;
		System.out.println("\n\n\nBem vindo ao sistema de gestão de Universidades");
		System.out.println("----------------Area de Login -------------");
		System.out.println("Digite as credênciais de acesso: ");
		System.out.println("email: ");
		email = scanner.nextLine();
		cleanConsole();
		System.out.println("senha: ");
		senha = scanner.nextLine();

		Usuario usuariolog = usuarioService.login(email, senha);
		cleanConsole();
		this.usuarioLogged = usuariolog;
		System.out.println("usuário logado: " + this.usuarioLogged.getNome());
		cleanConsole();
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
			default:
				throw new RuntimeException("autenticação incorreta");
		}

		System.out.println("Encerrando aplicação");

	}






	public void professorCLI() {
		boolean stay = true;
		int response;

		while (stay) {
			try{
				System.out.println("|---------- Arae do Professor ----------------");
				System.out.println("| Digite uma das opcoes a baixo              |");
				System.out.println("| 01 - visualizar alunos em uma disciplina   |");
				System.out.println("| 00 - sair                                  |");	
				System.out.println("|--------------------------------------------|");
				response = Integer.parseInt(scanner.nextLine());
				cleanConsole();
				switch (response) {
					case 0:
						stay = false;
						cleanConsole();
						break;
					case 1:
						visualizarAlunosNaDiciplina();
						break;
					default:
						throw new RuntimeException("Opção invalida");
				}
			}catch(Exception e){
				System.out.println("Exeção: "+ e.getMessage());
			}
		}


	}

	public void visualizarAlunosNaDiciplina(){

		System.out.println("Selecione o id da disciplina");

		List<Disciplina> disciplinas = disciplinaService.findAll(); 

		System.out.println("Escolha a Disciplina pelo Id");
		for (Disciplina disc : disciplinas) {
			System.out.println(disc.getId() + " - " + disc.getNome());
		}
		Long idDisciplina = Long.parseLong(scanner.nextLine());
		Disciplina disciplina = disciplinaService.findById(idDisciplina);
		List<Aluno> alunos = matriculaDisciplinaService.getAlunosMatriculados(disciplina);

		System.out.println("Aluno matriculados em " + disciplina + ":");
		for(Aluno aluno : alunos) {
			Usuario usuario = usuarioService.findById(aluno.getId());
			System.out.println(aluno.getId() + " - " + usuario.getNome());
		}

	}



	
	public void secretariaCLI(){
		int response;
		boolean stay = true;
		
		while (stay) {
			try{
				System.out.println("|------------ Area da Administaçao ------------|");
				System.out.println("|Digite uma das opções:                        |");
				System.out.println("| 01 - Cadastrar Aluno                         |");
				System.out.println("| 02 - Cadastrar Professor                     |");
				System.out.println("| 03 - Cadastrar Secretaria                    |");
				System.out.println("| 04 - Cadastrar Disciplina 				   	 |");
				System.out.println("| 05 - Cadastrar Curso                         |");
				System.out.println("| 06 - Adicionar disciplina a um curso:        |");
				System.out.println("| 00 - sair:                                   |");
				System.out.println("|----------------------------------------------|");
				response = Integer.parseInt(scanner.nextLine());

				switch (response) {

					case 1:
						cadastrarAluno();
						break;
					case 2:
						cadastrarProfessor();
						break;	
					case 3:
						cadastrarSecretaria();
						break;	
					case 4:
						cadastrarDisicplina();
						break;	
					case 5:
						cadastrarCurso();
						break;	
					case 6:
						vincularDisciplinaCurso();
						break;
					case 7:
						relatorioAlunosSemestre();
						break;
					case 8:
						enviarRelatorioFinanceiro();
						break;
					case 0:
						cleanConsole();
						stay = false;
						break;

					default:
						throw new RuntimeException("Opção invalida");
				}

			}catch(RuntimeException e){
				System.out.println(e.getMessage());
			}
		}	
	}	
	// ------------------- Secretária CLI ----------------------- //
	public void cadastrarAluno(){

		String nome, senha, email, cpf;
		Long id_curso;
		Curso selectedCourse;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();
		cleanConsole();
		System.out.println("E-mail: ");
		email = scanner.nextLine().toLowerCase();

		cleanConsole();
		System.out.println("senha: ");
		senha = scanner.nextLine();

		cleanConsole();
		System.out.println("cpf: ");
		cpf = scanner.nextLine();

		cleanConsole();
		System.out.println("Selecione o curso pelo id: ");
		List<Curso> cursos = cursoService.findAllCurso();

		for (Curso curso : cursos) {
			System.out.println(curso.getId() + " - " + curso.getNome());
		}
		System.out.println();
		
		id_curso = Long.parseLong(scanner.nextLine());
		selectedCourse = cursoService.findById(id_curso);

		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.ALUNO);
		alunoService.create(usuario.getId() , selectedCourse);
		cleanConsole();
		System.out.println("Aluno criado com sucesso!" + usuario.getNome());
	}


	public void cadastrarProfessor(){

		String nome, senha, email, cpf;
		cleanConsole();
		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();
		cleanConsole();
		System.out.println("E-mail: ");
		email = scanner.nextLine();
		cleanConsole();
		System.out.println("senha: ");
		senha = scanner.nextLine();
		cleanConsole();
		System.out.println("cpf: ");
		cpf = scanner.nextLine();
		cleanConsole();
		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.PROFESSOR);
		professorService.create(usuario.getId());
	
		System.out.println("Professor criado com sucesso!" + usuario.getNome());
		
	}


	public void cadastrarSecretaria(){

		String nome, senha, email, cpf;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();
		cleanConsole();
		System.out.println("E-mail: ");
		email = scanner.nextLine();
		cleanConsole();
		System.out.println("senha: ");
		senha = scanner.nextLine();
		cleanConsole();
		System.out.println("cpf: ");
		cpf = scanner.nextLine();
		cleanConsole();
		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.SECRETARIA);
		secretariaService.create(usuario.getId());
	
		System.out.println("Secretaria criado com sucesso!" + usuario.getNome());
		
	}

	public void cadastrarDisicplina() {

		String nome;
		int cargaHoraria, maximoAlunos;

		System.out.println("Digite o nome da Displina");
		nome = scanner.nextLine();
		cleanConsole();
		System.out.println("Digite Carga Horaria da Disciplina:");
		cargaHoraria = Integer.parseInt(scanner.nextLine());
		cleanConsole();
		System.out.println("Digite o maximo de Alunos na Disciplina:");
		maximoAlunos = Integer.parseInt(scanner.nextLine());
		cleanConsole();
		long id = disciplinaService.createDisciplina(nome, cargaHoraria, maximoAlunos).getId();
		cleanConsole();
		System.out.println("Salvo com sucesso! id: " + id);


	}

	public void vincularDisciplinaCurso() {

		String tipoDisciplina;
		int periodo;

		List<Disciplina> disciplinas = disciplinaService.findAll(); 

		System.out.println("Escolha a Disciplina pelo Id");
		for (Disciplina disc : disciplinas) {
			System.out.println(disc.getId() + " - " + disc.getNome());
		}
		long idDisciplina = Long.parseLong(scanner.nextLine());
		
		Disciplina disciplina = disciplinaService.findById(idDisciplina);


		List<Curso> cursos = cursoService.findAllCurso();

		System.out.println("EScolha o Curso pelo Id");
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

	public void cadastrarCurso() {

		String nome;

		System.out.println("Digite o nome do Curso");
		nome = scanner.nextLine();

		cursoService.createCurso(nome).getId();

		System.out.println("Salvo com sucesso!");

	}


	public void relatorioAlunosSemestre(){
		int ano;
		int mes;

		cleanConsole();
		System.out.println("Digite o ano: ");
		ano =  Integer.parseInt(scanner.nextLine());
		cleanConsole();
		System.out.println("Digite o mes: ");
		mes = Integer.parseInt(scanner.nextLine());

		List<MatriculaDisciplina> matriculas = matriculaDisciplinaService.getMatriculadasInSemester(0, 0);

		System.out.println("Alunos matriculados no sementre: " + mes+"/"+ano );
		for (MatriculaDisciplina matricula : matriculas) {
			Usuario usuario = usuarioService.findById(matricula.getAluno().getId());
			System.out.println(matricula.getAluno().getId() + " - " + usuario.getNome());
		}

	}



	public void alunoCLI(){
		boolean stay = true;
		int response;
		Aluno aluno = alunoService.findById(usuarioLogged.getId());

		while(stay){

			try{
				System.out.println("|----------------- Area do Aluno -----------------|");
				System.out.println("|Curso atual: " + aluno.getCurso().getNome());
				System.out.println("|Digite uma das opcoes a baixo:                   |"); 
				System.out.println("| 01 - matricurlar-se em disciplinas obrigatorias |");
				System.out.println("| 02 - matricurlar-se em disciplinas optativas    |");
				System.out.println("| 03 - vizualizar matriculas                      |");
				System.out.println("| 04 - cancelar matricula                         |");
				System.out.println("| 00 - sair:                                      |");
				System.out.println("|----------------- Area do Aluno -----------------|");
				response = Integer.parseInt(scanner.nextLine());
			
				switch (response) {
					case 1:
						matricularAlunoDisciplinaObrigatoria();
						break;
					case 2:
						matricularAlunoDisciplinaOptativa();
						break;
					case 3:
						listarMatriculasAluno();
						break;
					case 4:
						desmatricularAluno();
						break;
					case 0:
						cleanConsole();
						stay = false;
						break;

					default:
						throw new RuntimeException("Opção invalida");
				}
			}catch(Exception e){
				System.out.println("Exception: " + e.getMessage());
			}
		}

	}

	
	// ---------------------------- AlunoCLI -----------------------------//
	public void matricularAlunoDisciplinaOptativa(){

		Aluno aluno = alunoService.findById(this.usuarioLogged.getId());
		Curso curso = aluno.getCurso();

		List<DisciplinaCurso> disciplinasCursos = disciplinaCursoService.findByCursoAndTipo(curso, EnumDisciplina.OPTATIVA);

		cleanConsole();
		System.out.println("Selecione a disciplina por ID: ");
		for(DisciplinaCurso disciplinasCurso : disciplinasCursos){
			System.out.println(disciplinasCurso.getDisciplina().getId()+ " - " + disciplinasCurso.getDisciplina().getNome() + " - "+ disciplinasCurso.getTipo().getDescricao());
		}

		Long idDisciplina = Long.parseLong(scanner.nextLine());
		
		Disciplina disciplina = disciplinaService.findById(idDisciplina);

		matriculaDisciplinaService.matricular(aluno, disciplina, EnumDisciplina.OPTATIVA);

		System.out.println("A sua matricula na disciplina  "  + disciplina.getNome() + " foi realizada com sucesso.");

	}


	public void matricularAlunoDisciplinaObrigatoria(){

		Aluno aluno = alunoService.findById(this.usuarioLogged.getId());
		Curso curso = aluno.getCurso();

		List<DisciplinaCurso> disciplinasCursos = disciplinaCursoService.findByCursoAndTipo(curso, EnumDisciplina.OBRIGATORIA);

		System.out.println("Selecione a disciplina por ID: ");
		for(DisciplinaCurso disciplinasCurso : disciplinasCursos){
			System.out.println(disciplinasCurso.getDisciplina().getId()+ " - " + disciplinasCurso.getDisciplina().getNome() + " - "+ disciplinasCurso.getTipo().getDescricao());
		}

		Long idDisciplina = Long.parseLong(scanner.nextLine());
		
		Disciplina disciplina = disciplinaService.findById(idDisciplina);

		matriculaDisciplinaService.matricular(aluno, disciplina, EnumDisciplina.OBRIGATORIA);

		System.out.println("A sua matricula na disciplina "  + disciplina.getNome() + " foi realizada com sucesso.");
		

	}

	public void desmatricularAluno(){
		Aluno aluno = alunoService.findById(this.usuarioLogged.getId());
		Long idDisciplina;

		List<MatriculaDisciplina> disciplinasMatriculados = matriculaDisciplinaService.getMatriculasList(aluno);
		
		cleanConsole();
		System.out.println("Digite o id da qual você deseja de desmetricular");
		for (MatriculaDisciplina disciplinaMatriculada : disciplinasMatriculados) {
			System.out.println(disciplinaMatriculada.getDisciplina().getId() + " - " + disciplinaMatriculada.getDisciplina().getNome());
		}
		idDisciplina = Long.parseLong(scanner.nextLine());

		Disciplina disciplina = disciplinaService.findById(idDisciplina);

		System.out.println(matriculaDisciplinaService.deleteMatricula(aluno, disciplina));

	}

	public void listarMatriculasAluno(){
		Aluno aluno = alunoService.findById(this.usuarioLogged.getId());
		cleanConsole();
		List<MatriculaDisciplina> disciplinasMatriculados = matriculaDisciplinaService.getMatriculasList(aluno);
		for (MatriculaDisciplina disciplinaMatriculada : disciplinasMatriculados) {
			System.out.println(disciplinaMatriculada.getDisciplina().getId() + " - " + disciplinaMatriculada.getDisciplina().getNome());
		}

	}


	public void enviarRelatorioFinanceiro(){
		System.out.println("Relatorio financeiro enviado!");
	}


	 public void cleanConsole(){
		System.out.print("\033[H\033[2J");
        System.out.flush();
	 }

}
