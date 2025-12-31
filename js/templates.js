const Templates = {
    cache: {},
    async load(templateName) {
        if (this.cache[templateName]) {
            return this.cache[templateName];
        }
        try {
            const response = await fetch(`html/pages/${templateName}.html`);
            if (!response.ok) {
                throw new Error(`Template ${templateName} not found`);
            }
            const html = await response.text();
            this.cache[templateName] = html;
            return html;
        } catch (error) {
            console.error(`Error loading template ${templateName}:`, error);
            return `<div class="error">Template not found</div>`;
        }
    }
};
