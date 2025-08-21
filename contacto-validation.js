// ===== VALIDACIONES DEL FORMULARIO DE CONTACTO =====

$(document).ready(function() {
    // Inicializar AOS
    AOS.init();
    
    // Referencias a elementos del formulario
    const form = $('#contactForm');
    const submitBtn = $('#submitBtn');
    const resetBtn = $('#resetBtn');
    
    // Campos del formulario
    const fields = {
        nombre: $('#nombre'),
        apellido: $('#apellido'),
        mail: $('#mail'),
        edad: $('#edad'),
        dudas: $('#dudas'),
        conocimiento: $('#conocimiento')
    };
    
    // Mensajes de error
    const errorMessages = {
        nombre: {
            required: 'El nombre es obligatorio',
            minlength: 'El nombre debe tener al menos 2 caracteres',
            maxlength: 'El nombre no puede tener más de 50 caracteres',
            pattern: 'El nombre solo puede contener letras y espacios'
        },
        apellido: {
            required: 'El apellido es obligatorio',
            minlength: 'El apellido debe tener al menos 2 caracteres',
            maxlength: 'El apellido no puede tener más de 50 caracteres',
            pattern: 'El apellido solo puede contener letras y espacios'
        },
        mail: {
            required: 'El email es obligatorio',
            email: 'Ingresá un email válido'
        },
        edad: {
            required: 'La edad es obligatoria',
            min: 'La edad mínima es 13 años',
            max: 'La edad máxima es 120 años',
            number: 'La edad debe ser un número'
        },
        dudas: {
            required: 'Las dudas son obligatorias',
            minlength: 'Las dudas deben tener al menos 10 caracteres',
            maxlength: 'Las dudas no pueden tener más de 1000 caracteres'
        },
        conocimiento: {
            required: 'Seleccioná tu nivel de conocimiento'
        }
    };
    
    // Patrones de validación
    const patterns = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };
    
    // Función para mostrar error
    function showError(fieldName, message) {
        const field = fields[fieldName];
        const errorElement = $(`#${fieldName}-error`);
        
        field.removeClass('success').addClass('error');
        errorElement.text(message).addClass('show');
    }
    
    // Función para mostrar éxito
    function showSuccess(fieldName) {
        const field = fields[fieldName];
        const errorElement = $(`#${fieldName}-error`);
        
        field.removeClass('error').addClass('success');
        errorElement.removeClass('show');
    }
    
    // Función para limpiar errores
    function clearErrors() {
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const errorElement = $(`#${fieldName}-error`);
            
            field.removeClass('error success');
            errorElement.removeClass('show');
        });
        
        $('#success-message').removeClass('show');
    }
    
    // Función para validar un campo específico
    function validateField(fieldName) {
        const field = fields[fieldName];
        const value = field.val().trim();
        
        // Validar campo requerido
        if (field.prop('required') && !value) {
            showError(fieldName, errorMessages[fieldName].required);
            return false;
        }
        
        // Si no es requerido y está vacío, está bien
        if (!value) {
            showSuccess(fieldName);
            return true;
        }
        
        // Validaciones específicas por campo
        switch (fieldName) {
            case 'nombre':
            case 'apellido':
                if (!patterns[fieldName].test(value)) {
                    showError(fieldName, errorMessages[fieldName].pattern);
                    return false;
                }
                if (value.length < 2) {
                    showError(fieldName, errorMessages[fieldName].minlength);
                    return false;
                }
                if (value.length > 50) {
                    showError(fieldName, errorMessages[fieldName].maxlength);
                    return false;
                }
                break;
                
            case 'mail':
                if (!patterns.mail.test(value)) {
                    showError(fieldName, errorMessages[fieldName].email);
                    return false;
                }
                break;
                
            case 'edad':
                const age = parseInt(value);
                if (isNaN(age)) {
                    showError(fieldName, errorMessages[fieldName].number);
                    return false;
                }
                if (age < 13) {
                    showError(fieldName, errorMessages[fieldName].min);
                    return false;
                }
                if (age > 120) {
                    showError(fieldName, errorMessages[fieldName].max);
                    return false;
                }
                break;
                
            case 'dudas':
                if (value.length < 10) {
                    showError(fieldName, errorMessages[fieldName].minlength);
                    return false;
                }
                if (value.length > 1000) {
                    showError(fieldName, errorMessages[fieldName].maxlength);
                    return false;
                }
                break;
                
            case 'conocimiento':
                if (value === '') {
                    showError(fieldName, errorMessages[fieldName].required);
                    return false;
                }
                break;
        }
        
        showSuccess(fieldName);
        return true;
    }
    
    // Función para validar todo el formulario
    function validateForm() {
        let isValid = true;
        
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Event listeners para validación en tiempo real
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        
        // Validar al perder el foco
        field.on('blur', function() {
            validateField(fieldName);
        });
        
        // Validar al escribir (con delay)
        field.on('input', function() {
            clearTimeout(field.data('timeout'));
            const timeout = setTimeout(() => {
                validateField(fieldName);
            }, 500);
            field.data('timeout', timeout);
        });
    });
    
    // Manejar envío del formulario
    form.on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Deshabilitar botón de envío
            submitBtn.prop('disabled', true).text('Enviando...');
            
            // Simular envío (aquí iría la lógica real de envío)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                $('#success-message').addClass('show');
                
                // Mostrar alerta de SweetAlert
                Swal.fire({
                    title: '¡Enviado correctamente!',
                    text: 'Tu consulta ha sido enviada. Te responderemos pronto.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#68bbe3'
                });
                
                // Limpiar formulario
                form[0].reset();
                clearErrors();
                
                // Habilitar botón de envío
                submitBtn.prop('disabled', false).text('Enviar Consulta');
                
                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    $('#success-message').removeClass('show');
                }, 5000);
                
            }, 1500);
        } else {
            // Mostrar alerta de error
            Swal.fire({
                title: 'Error en el formulario',
                text: 'Por favor, corregí los errores marcados en rojo.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff6b6b'
            });
            
            // Hacer scroll al primer error
            const firstError = $('.error-message.show').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 100
                }, 500);
            }
        }
    });
    
    // Manejar reset del formulario
    resetBtn.on('click', function() {
        clearErrors();
        
        // Mostrar confirmación
        Swal.fire({
            title: '¿Limpiar formulario?',
            text: 'Se borrarán todos los datos ingresados.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ff6b6b',
            cancelButtonColor: '#68bbe3'
        }).then((result) => {
            if (result.isConfirmed) {
                form[0].reset();
                clearErrors();
                
                Swal.fire({
                    title: 'Formulario limpiado',
                    text: 'Todos los campos han sido reseteados.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#68bbe3'
                });
            }
        });
    });
    
    // Validación adicional para el select
    fields.conocimiento.on('change', function() {
        validateField('conocimiento');
    });
    
    // Prevenir envío con Enter en campos de texto
    $('input[type="text"], input[type="email"], input[type="number"], textarea').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    
    // Función para limpiar errores al hacer click en un campo
    Object.keys(fields).forEach(fieldName => {
        fields[fieldName].on('focus', function() {
            const errorElement = $(`#${fieldName}-error`);
            if (errorElement.hasClass('show')) {
                errorElement.removeClass('show');
            }
        });
    });
    
    // Inicializar tooltips para campos requeridos
    $('[required]').each(function() {
        $(this).attr('title', 'Este campo es obligatorio');
    });
    
    console.log('Sistema de validación de formulario inicializado');
});
