import { Row, Col } from 'react-bootstrap';
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import DashboardService from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState([]);

  async function refresh() {
    DashboardService.dashboard().then((response) => {
      setDashboard(response);
    });
  }

  useEffect(() => {
    refresh();
    return () => { };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.homeContainer}>

      <img src="/logo.png" alt="logo" className={styles.logo} />

        <div className={styles.conteudo}>
          <div className="row justify-content-center">

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_comentariosADM"); }}>
              <div class="card border-success mb-3">
                <div class="card-header"><h5 className={styles.impar}>Quantidade de Comentários</h5></div>
                <div class="card-body">
                  <h4 className={styles.impar}>{dashboard.qtdComentarios}</h4>
                </div>
              </div>
            </section>

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_cursosADM"); }}>
              <div class="card text-white bg-success mb-3">
                <div class="card-header text-white "> <h5 class={styles.par}>Quantidade de Cursos</h5></div>
                <div class="card-body text-white">
                  <h4 class={styles.par}>{dashboard.qtdCursos}</h4>
                </div>
              </div>
            </section>

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_editaisADM"); }}>
              <div class="card border-success mb-3">
                <div class="card-header"> <h5 className={styles.impar}>Quantidade de Editais</h5></div>
                <div class="card-body">
                  <h4 className={styles.impar}>{dashboard.qtdEdital}</h4>
                </div>
              </div>
            </section>

          </div>
          <div className="row justify-content-center">

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_membrosADM"); }}>
              <div class="card bg-success mb-3">
                <div class="card-header"><h5 class={styles.par}>Quantidade de Membros</h5></div>
                <div class="card-body">
                  <h4 class={styles.par}>{dashboard.qtdMembros}</h4>
                </div>
              </div>
            </section>

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_usuarios"); }}>
              <div class="card border-success mb-3">
                <div class="card-header"><h5 className={styles.impar}>Quantidade de Usuários</h5></div>
                <div class="card-body">
                  <h4 className={styles.impar}>{dashboard.qtdUsuarios}</h4>
                </div>
              </div>
            </section>

            <section className="col-md-3" onClick={(event) => { event.preventDefault(); window.open("/listagem_projetosADM"); }}>
              <div class="card bg-success mb-3">
                <div class="card-header"> <h5 class={styles.par}>Quantidade de Projetos</h5></div>
                <div class="card-body">
                  <h4 class={styles.par}>{dashboard.qtdProjeto}</h4>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
