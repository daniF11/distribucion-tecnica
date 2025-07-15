const personas = [
        { id: 1, name: "Daniel" },
        { id: 2, name: "Jonathan" },
        { id: 3, name: "Nelson" },
        { id: 4, name: "Ramsés" },
      ];

      // Lista de combinaciones fijas que no se repiten al día siguiente y se alternan cada dos días
      const combinaciones = [
        ["Daniel", "Jonathan"],
        ["Nelson", "Ramsés"],
        ["Daniel", "Nelson"],
        ["Jonathan", "Ramsés"],
        ["Daniel", "Ramsés"],
        ["Jonathan", "Nelson"],
      ];

      function generarSemana() {
        const dias = [
          ["lgroupa", "lgroupb"],
          ["mgroupa", "mgroupb"],
          ["migroupa", "migroupb"],
          ["jgroupa", "jgroupb"],
          ["vgroupa", "vgroupb"],
          ["sgroupa", "sgroupb"],
        ];

        // Usamos índices para tomar combinaciones de forma tal que se repitan cada 2 días como máximo
        const indicesUsados = [];

        for (let i = 0; i < dias.length; i++) {
          let idx1, idx2, grupo1, grupo2;
          do {
            idx1 = Math.floor(Math.random() * combinaciones.length);
            idx2 = Math.floor(Math.random() * combinaciones.length);
            grupo1 = combinaciones[idx1];
            grupo2 = combinaciones[idx2];
          } while (
            idx1 === idx2 ||
            grupo1.some((nombre) => grupo2.includes(nombre))
          );

          indicesUsados.push(idx1, idx2);

          document.querySelector(`.${dias[i][0]}`).innerText =
            grupo1.join(" - ");
          document.querySelector(`.${dias[i][1]}`).innerText =
            grupo2.join(" - ");
        }

        actualizarFechas();
      }

      function actualizarFechas() {
        const hoy = new Date();
        const lunes = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
        document.querySelectorAll(".fecha").forEach((td) => {
          const offset = parseInt(td.dataset.dia);
          const fecha = new Date(lunes);
          fecha.setDate(lunes.getDate() + offset - 1);
          td.innerText = fecha.toLocaleDateString("es-CO");
        });
      }

      generarSemana();