import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';

const FIELD_CONFIGS = {
	professor: [
		{ id: 'nome', label: 'Nome', type: 'text' },
		{ id: 'email', label: 'Email', type: 'email' },
		{ id: 'senha', label: 'Senha', type: 'password' },
		{ id: 'cpf', label: 'CPF', type: 'text' },
		{ id: 'materia', label: 'Matéria', type: 'text' },
		{ id: 'instituicaoId', label: 'ID da Instituição', type: 'text' },
	],
	aluno: [
		{ id: 'nome', label: 'Nome', type: 'text' },
		{ id: 'email', label: 'Email', type: 'email' },
		{ id: 'senha', label: 'Senha', type: 'password' },
		{ id: 'endereco', label: 'Endereço', type: 'text' },
		{ id: 'curso', label: 'Curso', type: 'text' },
		{ id: 'instituicaoId', label: 'ID da Instituição', type: 'number' },
	],
	empresa: [
		{ id: 'nomeFantasia', label: 'Nome Fantasia', type: 'text' },
		{ id: 'email', label: 'Email', type: 'email' },
		{ id: 'senha', label: 'Senha', type: 'password' },
		{ id: 'cnpj', label: 'CNPJ', type: 'text' },
	],
};

const API_ENDPOINTS = {
	professor: 'professores',
	aluno: 'alunos',
	empresa: 'empresas',
};

function Cadastro({ userType }) {
	const { setUserId, setUserType, setToken } = useUserContext();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});

	const handleInputChange = (fieldId, value) => {
		setFormData((prev) => ({
			...prev,
			[fieldId]: value,
		}));
	};

	const handleCadastro = async (e) => {
		e.preventDefault();

		let requestData = { ...formData };

		// Ajustes específicos por tipo de usuário
		if (userType === 'aluno') {
			requestData.instituicao_id = parseInt(formData.instituicaoId);
			delete requestData.instituicaoId;
		} else if (userType === 'empresa') {
			requestData.nome_fantasia = formData.nomeFantasia;
			delete requestData.nomeFantasia;
		} else if (userType === 'professor') {
			requestData.instituicao_id = formData.instituicaoId;
			delete requestData.instituicaoId;
		}

		try {
			const response = await fetch(`http://localhost:3000/${API_ENDPOINTS[userType]}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestData),
			});

			if (!response.ok) throw new Error(`Erro ao cadastrar ${userType}`);

			const createdUser = await response.json();
			setUserId(createdUser.id);
			setUserType(userType);

			// Login automático para professor e empresa
			if (userType !== 'aluno') {
				const loginResponse = await fetch('http://localhost:3000/auth/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: formData.email,
						senha: formData.senha,
					}),
				});

				if (!loginResponse.ok) throw new Error('Erro ao fazer login');
				const loginData = await loginResponse.json();
				setToken(loginData.token);
			}

			alert(`${userType} cadastrado com sucesso!`);
			navigate('/pagina-inicial');
		} catch (error) {
			console.error(`Erro ao cadastrar ${userType}:`, error);
			alert(`Erro ao cadastrar ${userType}. Tente novamente.`);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-semibold text-center mb-6 text-gray-800'>
					Cadastro {userType.charAt(0).toUpperCase() + userType.slice(1)}
				</h1>
				<form onSubmit={handleCadastro}>
					{FIELD_CONFIGS[userType].map((field) => (
						<div key={field.id} className='mb-4'>
							<label htmlFor={field.id} className='block text-gray-700 text-sm font-bold mb-2'>
								{field.label}
							</label>
							<input
								type={field.type}
								id={field.id}
								value={formData[field.id] || ''}
								onChange={(e) => handleInputChange(field.id, e.target.value)}
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
						</div>
					))}
					<button
						type='submit'
						className='mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
					>
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}

export default Cadastro;
