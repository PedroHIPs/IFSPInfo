import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Input,} from "reactstrap";
import AdministradorService from "services/AdministradorService";

function User() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSignupClick = () => {
    navigate('/admin/signup'); // Navega para a página de Signup
  };

  const handleLogin = async () => {
    try {
      const response = await AdministradorService.login(email, senha); // Usa o método login do serviço
      console.log("Email:" + email)

      if (response.status === 200) {
        sessionStorage.setItem("admin", JSON.stringify(response.data)); // Salva os dados do admin na sessão
        navigate('/admin/adminpage'); // Navega para o dashboard do admin
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch (error) {
      setError("Erro ao conectar-se ao servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{
          backgroundImage: `url(${require("assets/img/greenbackground.jpg")})`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100%'
        }}>
        <Card>
          <CardHeader>
            <h5>Login</h5>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <div>
                <label htmlFor="exampleInputEmail1">Email</label>
                <Input placeholder="Email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="exampleInputSenha1">Senha</label>
                <Input placeholder="Senha" type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}/>
              </div>
              <div className="align-items-center justify-content-center">
                <Button className="btn-round" color="primary" type="submit" onClick={handleLogin}> Login </Button>
              </div>
            </FormGroup>
          </CardBody>
          <hr />
          <CardFooter>
            <p className="description text-center">
              Ainda não cadastrado? <a onClick={handleSignupClick} class=".text-success">Registre-se aqui</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default User;
