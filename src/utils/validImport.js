
/**
 * Validates import loaded
 */
export default function validImport(module) {
    return module.default ? module.default : module;
}
