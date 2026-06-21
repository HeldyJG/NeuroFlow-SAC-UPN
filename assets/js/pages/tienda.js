// ============================================
// ECOPLENO - Módulo Tienda de Productos
// ============================================

const Tienda = {
  filtroCategoria: 'todos',
  searchQuery: '',
  showCarrito: false,
  whatsappNumber: '51942912415',

  categorias: [
    { id: 'todos', label: 'Todos', icon: '📦' },
    { id: 'juguetes-sensoriales', label: 'Juguetes Sensoriales', icon: '🧸' },
    { id: 'organizacion', label: 'Organización', icon: '📋' },
    { id: 'libros', label: 'Libros', icon: '📚' },
    { id: 'tecnologia', label: 'Tecnología', icon: '💻' }
  ],

  render() {
    const carrito = Storage.getArray('carrito');
    const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 1), 0);
    const totalPrecio = carrito.reduce((s, i) => s + (i.cantidad || 1) * i.price, 0);

    return `
      <section role="region" aria-label="Tienda de Productos">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
          <div>
            <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Tienda NeuroFlow</h1>
            <p style="color:var(--text-secondary);font-size:0.9rem">Productos especializados para niños con TDAH</p>
          </div>
          <button class="btn btn-outline" id="btn-ver-carrito" style="position:relative">
            🛒 Carrito ${totalItems > 0 ? `<span class="cart-badge" style="position:relative;top:-2px;right:0;display:inline-flex;width:auto;height:auto;padding:1px 6px;border-radius:10px;font-size:0.7rem;margin-left:4px">${totalItems}</span>` : ''}
          </button>
        </div>

        <!-- FILTROS -->
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px;position:relative">
            <input type="text" id="buscador-tienda" class="form-input" placeholder="Buscar productos..." aria-label="Buscar productos" style="padding-left:40px">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted)">🔍</span>
          </div>
        </div>

        <div class="tabs" role="tablist" style="margin-bottom:24px;flex-wrap:wrap;overflow:visible">
          ${this.categorias.map(c => `
            <button class="tab ${c.id === 'todos' ? 'active' : ''}" data-cat="${c.id}" role="tab" aria-selected="${c.id === 'todos'}">
              ${c.icon} ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- TIENDA GRID + CARRITO SIDEBAR -->
        <div style="display:grid;grid-template-columns:1fr;gap:24px">
          <div id="tienda-grid" class="reveal" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px">
            ${this.renderGrid()}
          </div>
        </div>

        <!-- CARRITO MODAL -->
        <div id="carrito-modal-container"></div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Filtros
    Utils.$$('.tab[data-cat]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.filtroCategoria = tab.dataset.cat;
        Utils.$$('.tab[data-cat]').forEach(t => {
          t.classList.toggle('active', t.dataset.cat === this.filtroCategoria);
          t.setAttribute('aria-selected', t.dataset.cat === this.filtroCategoria);
        });
        this.updateGrid();
      });
    });

    // Search
    const search = Utils.$('#buscador-tienda');
    if (search) {
      search.addEventListener('input', Utils.debounce(() => {
        this.searchQuery = search.value;
        this.updateGrid();
      }, 300));
    }

    // Carrito button
    Utils.$('#btn-ver-carrito')?.addEventListener('click', () => this.showCart());

    // Event delegation para toda la grid de productos
    const grid = Utils.$('#tienda-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.product-favorite');
        if (favBtn) {
          e.stopPropagation();
          const id = favBtn.dataset.id;
          let favs = Storage.getArray('favoritos_productos');
          if (favs.includes(id)) {
            favs = favs.filter(f => f !== id);
            Toast.info('Eliminado de favoritos');
          } else {
            favs.push(id);
            Toast.success('Agregado a favoritos 💚');
          }
          Storage.set('favoritos_productos', favs);
          favBtn.classList.toggle('active');
          favBtn.textContent = favs.includes(id) ? '❤️' : '🤍';
          return;
        }

        const addBtn = e.target.closest('.btn-agregar-carrito');
        if (addBtn) {
          e.stopPropagation();
          const id = addBtn.dataset.id;
          const prod = AppData.productos.find(p => p.id === id);
          if (!prod) return;

          Storage.pushItem('carrito', {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            emoji: prod.emoji,
            cantidad: 1
          });

          Toast.success(`${prod.name} agregado al carrito 💚`);
          addBtn.textContent = '✓ En carrito';
          addBtn.className = 'btn btn-sm btn-outline btn-ver-carrito-quick';
          this.updateCartBadge();
          return;
        }

        const cartBtn = e.target.closest('.btn-ver-carrito-quick');
        if (cartBtn) {
          this.showCart();
          return;
        }

        const viewBtn = e.target.closest('.btn-ver-producto');
        if (viewBtn) {
          e.stopPropagation();
          const prod = AppData.productos.find(p => p.id === viewBtn.dataset.id);
          if (prod) this.showProductDetail(prod);
        }
      });
    }
  },

  getProductos() {
    let productos = AppData.productos;
    if (this.filtroCategoria !== 'todos') {
      productos = productos.filter(p => p.category === this.filtroCategoria);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      productos = productos.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }
    return productos;
  },

  renderGrid() {
    const productos = this.getProductos();
    const favs = Storage.getArray('favoritos_productos');
    const carrito = Storage.getArray('carrito');

    if (productos.length === 0) {
      return `
        <div style="grid-column:1/-1;text-align:center;padding:64px 24px">
          <div style="font-size:4rem;margin-bottom:16px">📦</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px">No encontramos productos</h3>
          <p style="color:var(--text-muted)">Intenta con otros filtros</p>
        </div>
      `;
    }

    return productos.map(p => {
      const isFav = favs.includes(p.id);
      const inCart = carrito.find(c => c.id === p.id);
      return `
        <div class="card product-card" style="padding:0;overflow:hidden">
          <div style="height:180px;background:linear-gradient(135deg, #E8F5E9, #C8E6C9);display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative">
            ${p.emoji}
            <button class="product-favorite ${isFav ? 'active' : ''}" data-id="${p.id}" aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <div style="padding:16px">
            <h3 style="font-weight:600;color:var(--text-primary);font-size:0.95rem;margin-bottom:4px">${Utils.escapeHtml(p.name)}</h3>
            <span class="badge badge-blue" style="font-size:0.75rem">${p.categoryLabel}</span>
            <div style="display:flex;align-items:center;gap:4px;margin:6px 0;color:#FFA726;font-size:0.85rem">
              ${'★'.repeat(Math.floor(p.rating))} <span style="color:var(--text-muted)">(${p.reviews})</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
              <span class="product-price">$${p.price.toFixed(2)}</span>
              ${p.originalPrice ? `<span style="color:var(--text-muted);font-size:0.85rem;text-decoration:line-through">$${p.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div style="display:flex;gap:8px">
              ${inCart ? `
                <button class="btn btn-sm btn-outline btn-ver-carrito-quick" style="flex:1">✓ En carrito</button>
              ` : `
                <button class="btn btn-sm btn-primary btn-agregar-carrito" data-id="${p.id}" style="flex:1">🛒 Agregar</button>
              `}
              <button class="btn btn-sm btn-ghost btn-ver-producto" data-id="${p.id}">👁️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  updateGrid() {
    const grid = Utils.$('#tienda-grid');
    if (grid) {
      grid.innerHTML = this.renderGrid();
    }
  },

  showProductDetail(prod) {
    Modal.open({
      title: prod.name,
      size: 'lg',
      content: `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
          <div style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);border-radius:16px;height:250px;display:flex;align-items:center;justify-content:center;font-size:6rem">
            ${prod.emoji}
          </div>
          <div>
            <span class="badge badge-blue" style="margin-bottom:8px">${prod.categoryLabel}</span>
            <h3 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt);margin:8px 0">${Utils.escapeHtml(prod.name)}</h3>
            <div style="color:#FFA726;margin-bottom:8px">
              ${'★'.repeat(Math.floor(prod.rating))} ${prod.rating} (${prod.reviews} reseñas)
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
              <span class="product-price" style="font-size:1.5rem">$${prod.price.toFixed(2)}</span>
              ${prod.originalPrice ? `<span style="color:var(--text-muted);font-size:1rem;text-decoration:line-through">$${prod.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <p style="color:var(--text-secondary);line-height:1.7;margin-bottom:16px">${prod.description}</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn-primary btn-agregar-carrito-detail" data-id="${prod.id}" style="flex:1">🛒 Agregar al carrito</button>
              <button class="btn btn-outline" onclick="Modal.close()">Cerrar</button>
            </div>
          </div>
        </div>
      `
    });

    Utils.$('.btn-agregar-carrito-detail')?.addEventListener('click', () => {
      const carrito = Storage.getArray('carrito');
      const existing = carrito.find(c => c.id === prod.id);
      if (existing) {
        existing.cantidad = (existing.cantidad || 1) + 1;
        Storage.set('carrito', carrito);
      } else {
        Storage.pushItem('carrito', {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          emoji: prod.emoji,
          cantidad: 1
        });
      }
      Toast.success(`${prod.name} agregado al carrito`);
      Modal.close();
      this.updateCartBadge();
      this.updateGrid();
    });
  },

  showCart() {
    const carrito = Storage.getArray('carrito');
    const total = carrito.reduce((s, i) => s + (i.cantidad || 1) * i.price, 0);
    const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 1), 0);

    Modal.open({
      title: `🛒 Carrito de compras (${totalItems})`,
      size: 'lg',
      content: carrito.length === 0 ? `
        <div style="text-align:center;padding:48px 24px">
          <div style="font-size:4rem;margin-bottom:16px">🛒</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px">Tu carrito está vacío</h3>
          <p style="color:var(--text-muted);margin-bottom:16px">Explora la tienda y agrega productos</p>
          <button class="btn btn-primary" onclick="Modal.close()">Seguir comprando</button>
        </div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
          ${carrito.map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--gray-50);border-radius:12px">
              <span style="font-size:2rem">${item.emoji}</span>
              <div style="flex:1;min-width:0">
                <div style="font-weight:500;color:var(--text-primary)">${Utils.escapeHtml(item.name)}</div>
                <div style="color:var(--heading-color-alt);font-weight:600">$${(item.price * (item.cantidad || 1)).toFixed(2)}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <button class="btn btn-sm btn-ghost btn-carrito-cantidad" data-id="${item.id}" data-accion="menos" style="font-weight:700;font-size:1.1rem">−</button>
                <span style="font-weight:600;min-width:20px;text-align:center">${item.cantidad || 1}</span>
                <button class="btn btn-sm btn-ghost btn-carrito-cantidad" data-id="${item.id}" data-accion="mas" style="font-weight:700;font-size:1.1rem">+</button>
              </div>
              <button class="btn btn-sm btn-ghost btn-carrito-remove" data-id="${item.id}" style="color:#EF5350">🗑️</button>
            </div>
          `).join('')}
        </div>
        <div style="border-top:2px solid #E8F5E9;padding-top:16px">
          <div style="display:flex;justify-content:space-between;font-size:1.2rem;font-weight:700;color:var(--heading-color-alt);margin-bottom:16px">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <button class="btn btn-primary btn-lg btn-full" id="btn-finalizar-compra">🛍️ Pedir por WhatsApp</button>
        </div>
      `
    });

    if (carrito.length > 0) {
      // Quantity buttons - actualizar inline sin recargar modal
      Utils.$$('.btn-carrito-cantidad').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const accion = btn.dataset.accion;
          const carrito = Storage.getArray('carrito');
          const item = carrito.find(c => c.id === id);
          if (!item) return;

          if (accion === 'mas') {
            item.cantidad = (item.cantidad || 1) + 1;
          } else {
            item.cantidad = (item.cantidad || 1) - 1;
            if (item.cantidad <= 0) {
              const data = carrito.filter(c => c.id !== id);
              Storage.set('carrito', data);
              this.updateCartBadge();
              this.showCart();
              return;
            }
          }
          Storage.set('carrito', carrito);
          this.updateCartBadge();
          // Actualizar solo los números inline
          const row = btn.closest('[style*="display:flex"]');
          if (row) {
            const qtySpan = row.querySelector('span:nth-child(3)');
            if (qtySpan) qtySpan.textContent = item.cantidad;
            const priceSpan = row.querySelector('div:nth-child(2) > div:nth-child(2)');
            if (priceSpan) priceSpan.textContent = `$${(item.price * item.cantidad).toFixed(2)}`;
          }
          // Actualizar total
          const totalSpan = document.querySelector('#carrito-modal-container [style*="font-size:1.2rem"] span:last-child');
          if (totalSpan) {
            const newTotal = Storage.getArray('carrito').reduce((s, i) => s + (i.cantidad || 1) * i.price, 0);
            totalSpan.textContent = `$${newTotal.toFixed(2)}`;
          }
        });
      });

      // Remove
      Utils.$$('.btn-carrito-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const carrito = Storage.getArray('carrito').filter(c => c.id !== id);
          Storage.set('carrito', carrito);
          this.updateCartBadge();
          this.showCart();
          Toast.info('Producto eliminado del carrito');
        });
      });

      // Checkout vía WhatsApp
      Utils.$('#btn-finalizar-compra')?.addEventListener('click', () => {
        const carrito = Storage.getArray('carrito');
        if (carrito.length === 0) return;

        const total = carrito.reduce((s, i) => s + (i.cantidad || 1) * i.price, 0);
        const items = carrito.map(i => `• ${i.emoji} ${i.name} x${i.cantidad || 1} = $${((i.cantidad || 1) * i.price).toFixed(2)}`).join('\n');
        const mensaje = encodeURIComponent(
          `Hola, quiero realizar el siguiente pedido:\n\n${items}\n\nTotal: $${total.toFixed(2)}\n\n¡Gracias!`
        );

        if (this.whatsappNumber) {
          Modal.close();
          window.open(`https://wa.me/${this.whatsappNumber}?text=${mensaje}`, '_blank');
          Storage.set('carrito', []);
          this.updateCartBadge();
          this.updateGrid();
        } else {
          Toast.info('Configura tu número de WhatsApp en Tienda.whatsappNumber');
        }
      });
    }
  },

  updateCartBadge() {
    // Update the button text
    const btn = Utils.$('#btn-ver-carrito');
    if (btn) {
      const carrito = Storage.getArray('carrito');
      const total = carrito.reduce((s, i) => s + (i.cantidad || 1), 0);
      btn.innerHTML = `🛒 Carrito${total > 0 ? ` <span class="cart-badge" style="position:relative;top:-2px;right:0;display:inline-flex;width:auto;height:auto;padding:1px 6px;border-radius:10px;font-size:0.7rem;margin-left:4px">${total}</span>` : ''}`;
    }
  }
};

window.Tienda = Tienda;
